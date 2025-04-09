<?php
header("Content-Type: application/json");

// Controlla il Referer della richiesta
$allowed_origin = "https://iltuodominio"; // Cambia con il tuo dominio
if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], $allowed_origin) === false) {
    http_response_code(403);
    echo json_encode(["error" => "Accesso negato"]);
    exit;
}

// Percorso del file JSON con le credenziali
$credentialFile = __DIR__ . "/credential.json";

if (file_exists($credentialFile)) {
    // Legge il contenuto del file JSON
    $credentials = json_decode(file_get_contents($credentialFile), true);

    // Controlla se esiste la chiave API
    if (isset($credentials["apiKey"])) {
        echo json_encode(["apiKey" => $credentials["apiKey"]]);
        exit;
    }
}

// Se il file non esiste o manca la chiave API, restituisce errore
http_response_code(403);
echo json_encode(["error" => "Accesso negato"]);
exit;
