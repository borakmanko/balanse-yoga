import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'balanse_yoga',
  port: 3306,
  waitForConnections: true,
});


async function initializeTables() {
  const createUsersTable = `
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
  `;

  const createInstructorsTable = `
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
  `;

  const createYogaClassesTable = `
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
  `;

  const createClassSchedulesTable = `
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
  `;

  const createBookingsTable = `
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
  `;

  // Indexes (optional, but recommended for performance)
  const createIndexes = [
    `CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);`,
    `CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_bookings_schedule_id ON bookings(schedule_id);`,
    `CREATE INDEX IF NOT EXISTS idx_class_schedules_date ON class_schedules(date);`,
    `CREATE INDEX IF NOT EXISTS idx_class_schedules_instructor ON class_schedules(instructor_id, date);`
  ];

  const connection = await pool.getConnection();
  try {
    await connection.query(createUsersTable);
    await connection.query(createInstructorsTable);
    await connection.query(createYogaClassesTable);
    await connection.query(createClassSchedulesTable);
    await connection.query(createBookingsTable);
    for (const idx of createIndexes) {
      try { 
        await connection.query(idx); 
      } catch (e) {
        console.error('Error creating index:', idx, e.message);
      }
    }
    console.log('All tables initialized successfully.');
  } catch (err) {
    console.error('Error initializing tables:', err.message);
  } finally {
    connection.release();
  }
}

initializeTables().catch((err) => {
  console.error('Failed to initialize tables:', err.message);
});
export default pool;