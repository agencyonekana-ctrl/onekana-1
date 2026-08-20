<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

const DEFAULT_CHATBOT_ENDPOINT = 'https://manager.onekana-agency.com/onekana/api/bots/index.php?endpoint=widget&channel=api_rest&bot_id=6c27a56d-979c-41bd-8cbf-201c15b41a49';

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function environmentValue(string $name, string $default = ''): string
{
    $value = getenv($name);

    return is_string($value) && trim($value) !== '' ? trim($value) : $default;
}

function cleanString(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim(str_replace("\0", '', $value));

    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength)
        : substr($value, 0, $maxLength);
}

function normalizeHost(string $host): string
{
    $host = strtolower(explode(':', $host)[0]);

    return str_starts_with($host, 'www.') ? substr($host, 4) : $host;
}

function extractString(array $payload, array $paths): string
{
    foreach ($paths as $path) {
        $value = $payload;

        foreach ($path as $key) {
            if (!is_array($value) || !array_key_exists($key, $value)) {
                $value = null;
                break;
            }

            $value = $value[$key];
        }

        if (is_string($value) && trim($value) !== '') {
            return trim($value);
        }
    }

    return '';
}

function postToChatbot(string $endpoint, string $apiKey, string $body): array
{
    $headers = [
        'Accept: application/json',
        'Content-Type: application/json',
        'X-Api-Key: ' . $apiKey,
    ];

    if (function_exists('curl_init')) {
        $request = curl_init($endpoint);
        if ($request === false) {
            throw new RuntimeException('Unable to initialize cURL.');
        }

        curl_setopt_array($request, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 40,
            CURLOPT_FOLLOWLOCATION => false,
        ]);

        $responseBody = curl_exec($request);
        $statusCode = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
        $error = curl_error($request);
        curl_close($request);

        if (!is_string($responseBody)) {
            throw new RuntimeException($error !== '' ? $error : 'Chatbot request failed.');
        }

        return [$statusCode, $responseBody];
    }

    if (!filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOL)) {
        throw new RuntimeException('No outbound HTTP transport is available.');
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'ignore_errors' => true,
            'timeout' => 40,
        ],
    ]);
    $responseBody = @file_get_contents($endpoint, false, $context);
    if (!is_string($responseBody)) {
        throw new RuntimeException('Chatbot request failed.');
    }

    $statusCode = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d{3})/', $header, $matches) === 1) {
            $statusCode = (int) $matches[1];
        }
    }

    return [$statusCode, $responseBody];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Méthode non autorisée.']);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
    respond(413, ['success' => false, 'message' => 'La demande est trop volumineuse.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$requestHost = normalizeHost($_SERVER['HTTP_HOST'] ?? '');
$originHost = normalizeHost((string) ($origin !== '' ? parse_url($origin, PHP_URL_HOST) : ''));
$isDevelopment = strtolower(environmentValue('APP_ENV', 'production')) === 'development';
$isLocalRequest = $isDevelopment
    && in_array($originHost, ['localhost', '127.0.0.1'], true)
    && in_array($requestHost, ['localhost', '127.0.0.1'], true);

if ($originHost !== '' && $requestHost !== '' && $originHost !== $requestHost && !$isLocalRequest) {
    respond(403, ['success' => false, 'message' => 'Origine non autorisée.']);
}

try {
    $payload = json_decode((string) file_get_contents('php://input'), true, 16, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['success' => false, 'message' => 'Données invalides.']);
}

if (!is_array($payload)) {
    respond(400, ['success' => false, 'message' => 'Données invalides.']);
}

$message = cleanString($payload['message'] ?? '', 1000);
$sessionId = cleanString($payload['session_id'] ?? '', 160);

if ($message === '' || $sessionId === '') {
    respond(422, ['success' => false, 'message' => 'Le message ou la session est invalide.']);
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'onekana-chat-' . hash('sha256', $clientIp);
if (is_file($rateLimitFile) && (time() - (int) filemtime($rateLimitFile)) < 1) {
    respond(429, ['success' => false, 'message' => 'Veuillez patienter avant de renvoyer un message.']);
}

try {
    $endpoint = environmentValue('CHATBOT_API_ENDPOINT', DEFAULT_CHATBOT_ENDPOINT);
    $apiKey = environmentValue('CHATBOT_API_KEY');
    $scheme = strtolower((string) parse_url($endpoint, PHP_URL_SCHEME));

    if (!filter_var($endpoint, FILTER_VALIDATE_URL) || !in_array($scheme, ['https', 'http'], true)) {
        throw new RuntimeException('Invalid chatbot endpoint.');
    }

    if ($apiKey === '') {
        error_log('Onekana chatbot: CHATBOT_API_KEY is missing.');
        respond(503, [
            'success' => false,
            'message' => 'Le chatbot n’est pas encore configuré sur le serveur.',
        ]);
    }

    $requestBody = json_encode([
        'message' => $message,
        'session_id' => $sessionId,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

    [$upstreamStatus, $responseBody] = postToChatbot($endpoint, $apiKey, $requestBody);
    $upstream = json_decode($responseBody, true, 32, JSON_THROW_ON_ERROR);

    if (!is_array($upstream)) {
        throw new RuntimeException('Invalid chatbot response.');
    }

    if ($upstreamStatus >= 400 || strtolower((string) ($upstream['status'] ?? '')) === 'error') {
        $upstreamMessage = extractString($upstream, [['message'], ['error'], ['data', 'message']]);
        error_log('Onekana chatbot upstream error: ' . ($upstreamMessage !== '' ? $upstreamMessage : "HTTP {$upstreamStatus}"));
        respond(502, [
            'success' => false,
            'message' => 'Le chatbot est momentanément indisponible.',
        ]);
    }

    $reply = extractString($upstream, [
        ['reply'],
        ['response'],
        ['answer'],
        ['data', 'reply'],
        ['data', 'response'],
        ['data', 'answer'],
        ['data', 'message'],
        ['message'],
    ]);

    if ($reply === '' && is_string($upstream['data'] ?? null)) {
        $reply = trim($upstream['data']);
    }

    if ($reply === '') {
        throw new RuntimeException('Chatbot response does not contain a reply.');
    }

    @touch($rateLimitFile);

    respond(200, [
        'success' => true,
        'reply' => $reply,
        'session_id' => extractString($upstream, [['session_id'], ['data', 'session_id']]) ?: $sessionId,
    ]);
} catch (Throwable $error) {
    error_log('Onekana chatbot error: ' . $error->getMessage());
    respond(502, [
        'success' => false,
        'message' => 'Le chatbot est momentanément indisponible.',
    ]);
}
