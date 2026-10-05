

<?php
// Show errors (important for debugging)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS for React (Vite default port 5173)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Preflight fix
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

// DB connection
$conn = new mysqli("localhost", "root", "", "study_notes_db");

if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]));
}
?>