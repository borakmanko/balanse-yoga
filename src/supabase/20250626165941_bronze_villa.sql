-- Create database
CREATE DATABASE IF NOT EXISTS balanse_yoga;
USE balanse_yoga;

-- Users table for storing user profiles
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    custom_gender VARCHAR(50),
    profile_picture TEXT,
    bio TEXT,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Instructors table
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

-- Yoga classes table
CREATE TABLE IF NOT EXISTS yoga_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL, -- in minutes
    level ENUM('beginner', 'intermediate', 'advanced', 'all') NOT NULL,
    instructor_id INT,
    max_capacity INT DEFAULT 20,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

-- Class schedules table
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

-- Bookings table
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

-- Insert sample instructors
INSERT INTO instructors (name, email, phone, bio, specialties, certifications, experience_years) VALUES
('Sarah Chen', 'sarah@balanse.com', '+1-555-0101', 'Sarah brings mindfulness and grace to every class, helping students find their inner strength.', '["Vinyasa Flow", "Meditation", "Prenatal Yoga"]', '["RYT-500", "Meditation Teacher", "Prenatal Yoga"]', 8),
('Michael Rodriguez', 'michael@balanse.com', '+1-555-0102', 'Michael challenges students to push their limits while maintaining proper alignment and breath.', '["Ashtanga", "Power Yoga", "Anatomy"]', '["RYT-500", "Ashtanga Certified", "Anatomy Specialist"]', 10),
('Emma Thompson', 'emma@balanse.com', '+1-555-0103', 'Emma creates a nurturing environment where students can heal and restore their bodies and minds.', '["Hatha Yoga", "Restorative Yoga", "Yin Yoga"]', '["RYT-200", "Yin Yoga", "Trauma-Informed Yoga"]', 6),
('David Kim', 'david@balanse.com', '+1-555-0104', 'David helps students build strength and flexibility through challenging yet accessible sequences.', '["Hot Yoga", "Flexibility", "Kickboxing"]', '["RYT-300", "Hot Yoga Certified", "Flexibility Coach"]', 7);

-- Insert sample yoga classes
INSERT INTO yoga_classes (name, type, description, duration, level, instructor_id, max_capacity, price) VALUES
('Morning Vinyasa Flow', 'Vinyasa', 'Dynamic sequences that link movement and breath in a flowing practice.', 75, 'intermediate', 1, 20, 25.00),
('Gentle Hatha', 'Hatha', 'Gentle, slow-paced yoga focusing on basic postures and breathing techniques.', 60, 'beginner', 3, 15, 20.00),
('Power Yoga', 'Power', 'Fitness-based vinyasa practice with strength-building poses.', 45, 'advanced', 2, 18, 30.00),
('Hot Yoga', 'Hot', 'Yoga practiced in a heated room to enhance flexibility and detoxification.', 60, 'intermediate', 4, 25, 28.00),
('Restorative Yoga', 'Restorative', 'Relaxing practice using props to support the body in restful poses.', 60, 'all', 3, 12, 22.00),
('Ashtanga Primary', 'Ashtanga', 'Traditional, vigorous style of yoga with a set sequence of poses.', 90, 'advanced', 2, 15, 35.00),
('Prenatal Yoga', 'Prenatal', 'Gentle yoga practice designed specifically for expecting mothers.', 60, 'beginner', 1, 10, 25.00),
('Meditation & Mindfulness', 'Meditation', 'Guided meditation and breathing exercises for mental clarity.', 30, 'all', 1, 20, 15.00);

-- Insert sample class schedules for the next few weeks
INSERT INTO class_schedules (class_id, instructor_id, date, start_time, end_time) VALUES
-- Week 1 (Jan 15-21, 2025)
(1, 1, '2025-01-15', '09:00:00', '10:15:00'),
(2, 3, '2025-01-15', '14:00:00', '15:00:00'),
(3, 2, '2025-01-15', '10:00:00', '10:45:00'),
(4, 4, '2025-01-16', '18:00:00', '19:00:00'),
(3, 1, '2025-01-17', '07:00:00', '07:45:00'),
(8, 2, '2025-01-17', '19:00:00', '19:30:00'),
(4, 3, '2025-01-18', '11:00:00', '12:00:00'),
(5, 4, '2025-01-19', '16:00:00', '17:00:00'),

-- Week 2 (Jan 22-28, 2025)
(1, 1, '2025-01-22', '09:00:00', '10:15:00'),
(2, 3, '2025-01-22', '14:00:00', '15:00:00'),
(6, 2, '2025-01-23', '18:30:00', '20:00:00'),
(4, 4, '2025-01-24', '11:00:00', '12:00:00'),
(7, 1, '2025-01-25', '10:00:00', '11:00:00'),
(5, 3, '2025-01-26', '16:00:00', '17:00:00'),

-- Week 3 (Jan 29 - Feb 4, 2025)
(1, 1, '2025-01-29', '09:00:00', '10:15:00'),
(3, 2, '2025-01-30', '07:30:00', '08:15:00'),
(4, 4, '2025-01-31', '18:00:00', '19:00:00'),
(2, 3, '2025-02-01', '14:00:00', '15:00:00'),
(8, 1, '2025-02-02', '19:00:00', '19:30:00');

-- Create indexes for better performance
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_schedule_id ON bookings(schedule_id);
CREATE INDEX idx_class_schedules_date ON class_schedules(date);
CREATE INDEX idx_class_schedules_instructor ON class_schedules(instructor_id, date);