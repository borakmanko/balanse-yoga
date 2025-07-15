<?php
// index.php
require_once 'config.php';

enableCORS();

// Simple health check endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
    sendJsonResponse([
        'message' => 'Balanse Yoga API is running',
        'version' => '1.0.0',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

// Route to api.php for all other requests
require_once 'api.php';
?>