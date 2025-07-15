<?php
// api.php
require_once 'config.php';

enableCORS();

$database = new Database();
$pdo = $database->getConnection();

// Parse the request
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Remove query parameters and base path
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/api', '', $path); // Remove /api prefix if present
$pathSegments = array_filter(explode('/', $path));

try {
    // Route the request
    if (count($pathSegments) >= 1 && $pathSegments[0] === 'upload') {
        handleFileUpload();
    } elseif (count($pathSegments) >= 1 && $pathSegments[0] === 'users') {
        handleUserRoutes($pathSegments, $requestMethod, $pdo);
    } else {
        sendErrorResponse('Endpoint not found', 404);
    }
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    sendErrorResponse('Internal server error', 500, $e->getMessage());
}

function handleFileUpload() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Method not allowed', 405);
    }
    
    // Check if file was uploaded
    if (!isset($_FILES['profilePicture']) || $_FILES['profilePicture']['error'] !== UPLOAD_ERR_OK) {
        sendErrorResponse('No file uploaded', 400);
    }
    
    $file = $_FILES['profilePicture'];
    
    // Validate file type
    $allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!in_array($file['type'], $allowedTypes)) {
        sendErrorResponse('Only .png, .jpg and .jpeg files are allowed!', 400);
    }
    
    // Create uploads directory if it doesn't exist
    $uploadDir = __DIR__ . '/uploads';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $uniqueName = time() . '_' . $file['name'];
    $targetPath = $uploadDir . '/' . $uniqueName;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $imageUrl = "$protocol://$host/uploads/$uniqueName";
        
        sendJsonResponse(['imageUrl' => $imageUrl]);
    } else {
        sendErrorResponse('Failed to upload file', 500);
    }
}

function handleUserRoutes($pathSegments, $method, $pdo) {
    if (count($pathSegments) === 1 && $pathSegments[0] === 'users') {
        // POST /users - Create user
        if ($method === 'POST') {
            createUser($pdo);
        } else {
            sendErrorResponse('Method not allowed', 405);
        }
    } elseif (count($pathSegments) === 2 && $pathSegments[0] === 'users') {
        // GET /users/{firebaseUid} - Get user
        // PUT /users/{firebaseUid} - Update user
        $firebaseUid = $pathSegments[1];
        
        if ($method === 'GET') {
            getUser($firebaseUid, $pdo);
        } elseif ($method === 'PUT') {
            updateUser($firebaseUid, $pdo);
        } else {
            sendErrorResponse('Method not allowed', 405);
        }
    } else {
        sendErrorResponse('Endpoint not found', 404);
    }
}

function createUser($pdo) {
    $data = getJsonInput();
    
    if (!$data) {
        sendErrorResponse('Invalid JSON data', 400);
    }
    
    error_log("Received profile data: " . json_encode($data));
    
    $firebaseUid = $data['firebaseUid'] ?? null;
    $role = $data['role'] ?? 'user';
    $firstName = toNull($data['firstName'] ?? null);
    $middleName = toNull($data['middleName'] ?? null);
    $lastName = toNull($data['lastName'] ?? null);
    $age = toNull($data['age'] ?? null);
    $city = toNull($data['city'] ?? null);
    $state = toNull($data['state'] ?? null);
    $gender = toNull($data['gender'] ?? null);
    $customGender = toNull($data['customGender'] ?? null);
    $profilePicture = toNull($data['profilePicture'] ?? null);
    $preferences = json_encode($data['preferences'] ?? []);
    $bio = toNull($data['bio'] ?? null);
    
    if (!$firebaseUid) {
        sendErrorResponse('Firebase UID is required', 400);
    }
    
    try {
        $sql = "INSERT INTO users (firebase_uid, role, first_name, middle_name, last_name, age, city, state, gender, custom_gender, profile_picture, preferences, bio)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                role=VALUES(role), first_name=VALUES(first_name), middle_name=VALUES(middle_name), last_name=VALUES(last_name),
                age=VALUES(age), city=VALUES(city), state=VALUES(state), gender=VALUES(gender), custom_gender=VALUES(custom_gender),
                profile_picture=VALUES(profile_picture), preferences=VALUES(preferences), bio=VALUES(bio)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $firebaseUid, $role, $firstName, $middleName, $lastName, $age, $city, $state,
            $gender, $customGender, $profilePicture, $preferences, $bio
        ]);
        
        sendJsonResponse(['success' => true]);
    } catch (PDOException $e) {
        error_log("Error creating user profile: " . $e->getMessage());
        sendErrorResponse('Database error', 500, $e->getMessage());
    }
}

function getUser($firebaseUid, $pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE firebase_uid = ?");
        $stmt->execute([$firebaseUid]);
        $user = $stmt->fetch();
        
        if (!$user) {
            sendErrorResponse('Not found', 404);
        }
        
        sendJsonResponse(mapUserRowToCamel($user));
    } catch (PDOException $e) {
        error_log("Error fetching user profile: " . $e->getMessage());
        sendErrorResponse('Database error', 500, $e->getMessage());
    }
}

function updateUser($firebaseUid, $pdo) {
    $data = getJsonInput();
    
    if (!$data) {
        sendErrorResponse('Invalid JSON data', 400);
    }
    
    $firstName = toNull($data['firstName'] ?? null);
    $middleName = toNull($data['middleName'] ?? null);
    $lastName = toNull($data['lastName'] ?? null);
    $age = toNull($data['age'] ?? null);
    $city = toNull($data['city'] ?? null);
    $state = toNull($data['state'] ?? null);
    $gender = toNull($data['gender'] ?? null);
    $customGender = toNull($data['customGender'] ?? null);
    $profilePicture = toNull($data['profilePicture'] ?? null);
    $preferences = json_encode($data['preferences'] ?? []);
    $bio = toNull($data['bio'] ?? null);
    
    try {
        $sql = "UPDATE users SET
                first_name = ?, middle_name = ?, last_name = ?, age = ?, city = ?, state = ?, 
                gender = ?, custom_gender = ?, profile_picture = ?, preferences = ?, bio = ?
                WHERE firebase_uid = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $firstName, $middleName, $lastName, $age, $city, $state,
            $gender, $customGender, $profilePicture, $preferences, $bio, $firebaseUid
        ]);
        
        // Fetch the updated user
        $stmt = $pdo->prepare("SELECT * FROM users WHERE firebase_uid = ?");
        $stmt->execute([$firebaseUid]);
        $user = $stmt->fetch();
        
        if (!$user) {
            sendErrorResponse('Not found', 404);
        }
        
        sendJsonResponse(mapUserRowToCamel($user));
    } catch (PDOException $e) {
        error_log("Error updating user profile: " . $e->getMessage());
        sendErrorResponse('Database error', 500, $e->getMessage());
    }
}
?>