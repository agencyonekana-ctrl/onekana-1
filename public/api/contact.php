<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Méthode non autorisée.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 32768) {
    respond(413, ['success' => false, 'message' => 'La demande est trop volumineuse.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$requestHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
$originHost = $origin !== '' ? strtolower((string) parse_url($origin, PHP_URL_HOST)) : '';
if ($originHost !== '' && $requestHost !== '' && $originHost !== $requestHost) {
    respond(403, ['success' => false, 'message' => 'Origine non autorisée.']);
}

try {
    $payload = json_decode((string) file_get_contents('php://input'), true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['success' => false, 'message' => 'Données invalides.']);
}

if (!is_array($payload)) {
    respond(400, ['success' => false, 'message' => 'Données invalides.']);
}

// Honeypot: real visitors never fill this field.
if (cleanString($payload['website'] ?? '', 200) !== '') {
    respond(200, ['success' => true, 'message' => 'Message envoyé.']);
}

$name = cleanString($payload['name'] ?? '', 120);
$email = cleanString($payload['email'] ?? '', 190);
$company = cleanString($payload['company'] ?? '', 160);
$subject = cleanString($payload['subject'] ?? '', 180);
$pole = cleanString($payload['pole'] ?? '', 80);
$support = cleanString($payload['support'] ?? '', 120);
$budget = cleanString($payload['budget'] ?? '', 80);
$message = cleanString($payload['message'] ?? '', 5000);

$allowedPoles = [
    'Onekana MediaMove',
    'Onekana Streets',
    'Onekana DOOH',
    'Onekana Connect',
    'Onekana Studio',
    'Onekana Life',
];

if (
    $name === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || $subject === ''
    || !in_array($pole, $allowedPoles, true)
    || $message === ''
) {
    respond(422, [
        'success' => false,
        'message' => 'Veuillez vérifier les champs obligatoires.',
    ]);
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'onekana-contact-' . hash('sha256', $clientIp);
if (is_file($rateLimitFile) && (time() - (int) filemtime($rateLimitFile)) < 30) {
    respond(429, [
        'success' => false,
        'message' => 'Veuillez patienter quelques secondes avant un nouvel envoi.',
    ]);
}

try {
    $recipient = 'contact@onekana-agency.com';
    $safeSubject = str_replace(["\r", "\n"], ' ', sprintf('[%s] %s', $pole, $subject));
    $encodedSubject = '=?UTF-8?B?' . base64_encode($safeSubject) . '?=';
    $body = implode("\n", array_filter([
        "Nom: {$name}",
        "Email: {$email}",
        'Entreprise: ' . ($company !== '' ? $company : '-'),
        "Pôle: {$pole}",
        $support !== '' ? "Support: {$support}" : null,
        'Budget indicatif: ' . ($budget !== '' ? $budget : 'Non renseigné'),
        '',
        'Message:',
        $message,
    ], static fn ($line): bool => $line !== null));

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Site Onekana <contact@onekana-agency.com>',
        "Reply-To: {$email}",
        'X-Mailer: PHP/' . PHP_VERSION,
    ]);

    if (!mail($recipient, $encodedSubject, $body, $headers)) {
        throw new RuntimeException('The local mail transport rejected the message.');
    }

    @touch($rateLimitFile);

    respond(200, [
        'success' => true,
        'message' => 'Votre message a été envoyé à Onekana.',
    ]);
} catch (Throwable $error) {
    error_log('Onekana contact mail error: ' . $error->getMessage());
    respond(500, [
        'success' => false,
        'message' => 'Le message n’a pas pu être envoyé. Veuillez réessayer.',
    ]);
}
