<?php
// config.php
class Database {
    private $host = "srv594.hstgr.io";
    private $username = "u550323199_balanse";
    private $password = "Avgm!@aG4@tN";
    private $database = "u550323199_balanse_yoga";
    private $port = 3306;
    private $pdo;

    public function __construct() {
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->database};charset=utf8mb4";
            $this->pdo = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            $this->initializeTables();
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->pdo;
    }

    private function initializeTables() {
        $tables = [
            "users" => "
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
                    role VARCHAR(50) DEFAULT 'user',
                    first_name VARCHAR(100),
                    middle_name VARCHAR(100),
                    last_name VARCHAR(100),
                    age INT,
                    city VARCHAR(100),
                    state VARCHAR(100),
                    gender ENUM('male', 'female', 'other'),
                    custom_gender VARCHAR(50),
                    profile_picture TEXT,
                    bio TEXT,
                    preferences JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            ",
            "instructors" => "
                CREATE TABLE IF NOT EXISTS instructors (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    phone VARCHAR(20),
                    bio TEXT,
                    specialties JSON,
                    certifications JSON,
                    profile_picture TEXT,
                    experience_years INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            ",
            "yoga_classes" => "
                CREATE TABLE IF NOT EXISTS yoga_classes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    type VARCHAR(100) NOT NULL,
                    description TEXT,
                    duration INT NOT NULL,
                    level ENUM('beginner', 'intermediate', 'advanced', 'all') NOT NULL,
                    instructor_id INT,
                    max_capacity INT DEFAULT 20,
                    price DECIMAL(10, 2) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
                );
            ",
            "class_schedules" => "
                CREATE TABLE IF NOT EXISTS class_schedules (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    class_id INT NOT NULL,
                    instructor_id INT NOT NULL,
                    date DATE NOT NULL,
                    start_time TIME NOT NULL,
                    end_time TIME NOT NULL,
                    status ENUM('scheduled', 'cancelled', 'completed') DEFAULT 'scheduled',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (class_id) REFERENCES yoga_classes(id) ON DELETE CASCADE,
                    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE,
                    UNIQUE KEY unique_schedule (instructor_id, date, start_time)
                );
            ",
            "bookings" => "
                CREATE TABLE IF NOT EXISTS bookings (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id VARCHAR(255) NOT NULL,
                    schedule_id INT NOT NULL,
                    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    status ENUM('booked', 'cancelled', 'completed', 'no_show') DEFAULT 'booked',
                    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (schedule_id) REFERENCES class_schedules(id) ON DELETE CASCADE,
                    UNIQUE KEY unique_booking (user_id, schedule_id)
                );
            "
        ];

        $indexes = [
            "CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);",
            "CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);",
            "CREATE INDEX IF NOT EXISTS idx_bookings_schedule_id ON bookings(schedule_id);",
            "CREATE INDEX IF NOT EXISTS idx_class_schedules_date ON class_schedules(date);",
            "CREATE INDEX IF NOT EXISTS idx_class_schedules_instructor ON class_schedules(instructor_id, date);"
        ];

        try {
            foreach ($tables as $name => $sql) {
                $this->pdo->exec($sql);
            }
            
            foreach ($indexes as $index) {
                try {
                    $this->pdo->exec($index);
                } catch (PDOException $e) {
                    error_log("Error creating index: " . $e->getMessage());
                }
            }
            
            error_log("All tables initialized successfully.");
        } catch (PDOException $e) {
            error_log("Error initializing tables: " . $e->getMessage());
        }
    }
}

// Helper functions
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function sendErrorResponse($message, $statusCode = 500, $details = null) {
    $response = ['error' => $message];
    if ($details) {
        $response['details'] = $details;
    }
    sendJsonResponse($response, $statusCode);
}

function enableCORS() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

function mapUserRowToCamel($row) {
    return [
        'id' => $row['id'],
        'firebaseUid' => $row['firebase_uid'],
        'role' => $row['role'],
        'firstName' => $row['first_name'],
        'middleName' => $row['middle_name'],
        'lastName' => $row['last_name'],
        'age' => $row['age'],
        'city' => $row['city'],
        'state' => $row['state'],
        'gender' => $row['gender'],
        'customGender' => $row['custom_gender'],
        'profilePicture' => $row['profile_picture'],
        'bio' => $row['bio'],
        'preferences' => is_string($row['preferences']) ? json_decode($row['preferences'], true) : $row['preferences'],
        'createdAt' => $row['created_at'],
        'updatedAt' => $row['updated_at']
    ];
}

function toNull($value) {
    return ($value === null || $value === '' || $value === undefined) ? null : $value;
}
?>