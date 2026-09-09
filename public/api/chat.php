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

function endpointWithQuery(string $endpoint, array $parameters): string
{
    return $endpoint
        . (str_contains($endpoint, '?') ? '&' : '?')
        . http_build_query($parameters, '', '&', PHP_QUERY_RFC3986);
}

function requestChatbot(string $method, string $endpoint, string $apiKey, string $body = ''): array
{
    $headers = [
        'Accept: application/json',
    ];

    if ($method === 'POST') {
        $headers[] = 'Content-Type: application/json';
    }

    if ($apiKey !== '') {
        $headers[] = 'X-Api-Key: ' . $apiKey;
    }

    if (function_exists('curl_init')) {
        $request = curl_init($endpoint);
        if ($request === false) {
            throw new RuntimeException('Unable to initialize cURL.');
        }

        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 40,
            CURLOPT_FOLLOWLOCATION => false,
        ];

        if ($method === 'POST') {
            $options[CURLOPT_POSTFIELDS] = $body;
        }

        curl_setopt_array($request, $options);

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

    $httpOptions = [
        'method' => $method,
        'header' => implode("\r\n", $headers),
        'ignore_errors' => true,
        'timeout' => 40,
    ];

    if ($method === 'POST') {
        $httpOptions['content'] = $body;
    }

    $context = stream_context_create(['http' => $httpOptions]);
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

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? '');
if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
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
    $endpoint = environmentValue('CHATBOT_API_ENDPOINT', DEFAULT_CHATBOT_ENDPOINT);
    $apiKey = environmentValue('CHATBOT_API_KEY');
    $scheme = strtolower((string) parse_url($endpoint, PHP_URL_SCHEME));

    if (!filter_var($endpoint, FILTER_VALIDATE_URL) || !in_array($scheme, ['https', 'http'], true)) {
        throw new RuntimeException('Invalid chatbot endpoint.');
    }

    $action = cleanString($_GET['action'] ?? '', 24);
    $targetEndpoint = $endpoint;
    $requestBody = '';
    $rateLimitFile = '';

    if ($method === 'GET') {
        if ($action !== 'messages') {
            respond(400, ['success' => false, 'message' => 'Action non autorisée.']);
        }

        $sessionId = cleanString($_GET['session_id'] ?? '', 160);
        $sinceId = filter_var($_GET['since_id'] ?? 0, FILTER_VALIDATE_INT, [
            'options' => ['default' => 0, 'min_range' => 0],
        ]);

        if ($sessionId === '') {
            respond(422, ['success' => false, 'message' => 'La session est invalide.']);
        }

        $targetEndpoint = endpointWithQuery($endpoint, [
            'action' => 'messages',
            'session_id' => $sessionId,
            'since_id' => $sinceId,
        ]);
    } else {
        try {
            $payload = json_decode((string) file_get_contents('php://input'), true, 16, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            respond(400, ['success' => false, 'message' => 'Données invalides.']);
        }

        if (!is_array($payload)) {
            respond(400, ['success' => false, 'message' => 'Données invalides.']);
        }

        $sessionId = cleanString($payload['session_id'] ?? '', 160);
        if ($sessionId === '') {
            respond(422, ['success' => false, 'message' => 'La session est invalide.']);
        }

        if ($action === 'feedback') {
            $score = filter_var($payload['score'] ?? null, FILTER_VALIDATE_INT, [
                'options' => ['min_range' => 1, 'max_range' => 5],
            ]);

            if ($score === false) {
                respond(422, ['success' => false, 'message' => 'L’évaluation est invalide.']);
            }

            $targetEndpoint = endpointWithQuery($endpoint, ['action' => 'feedback']);
            $requestBody = json_encode([
                'session_id' => $sessionId,
                'score' => $score,
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        } elseif ($action === '') {
            $message = cleanString($payload['message'] ?? '', 1000);
            if ($message === '') {
                respond(422, ['success' => false, 'message' => 'Le message est invalide.']);
            }

            $clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            $rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'onekana-chat-' . hash('sha256', $clientIp);
            if (is_file($rateLimitFile) && (time() - (int) filemtime($rateLimitFile)) < 1) {
                respond(429, ['success' => false, 'message' => 'Veuillez patienter avant de renvoyer un message.']);
            }

            $requestBody = json_encode([
                'message' => $message,
                'session_id' => $sessionId,
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        } else {
            respond(400, ['success' => false, 'message' => 'Action non autorisée.']);
        }
    }

    [$upstreamStatus, $responseBody] = requestChatbot($method, $targetEndpoint, $apiKey, $requestBody);
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

    if ($rateLimitFile !== '') {
        @touch($rateLimitFile);
    }

    respond(200, $upstream);
} catch (Throwable $error) {
    error_log('Onekana chatbot error: ' . $error->getMessage());
    respond(502, [
        'success' => false,
        'message' => 'Le chatbot est momentanément indisponible.',
    ]);
}
