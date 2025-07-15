// import express from "express";
// import cors from "cors";
// import pool from "./db.js";
// import multer from "multer";
// import path from "path";
// import fs from "fs";


// const app = express();
// app.use(cors());
// app.use(express.json());

// // Set up storage for uploaded files
// const uploadDir = path.resolve("uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     // Use timestamp and original filename only
//     const uniqueName = `${Date.now()}_${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/jpg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only .png, .jpg and .jpeg files are allowed!"), false);
//     }
//   }
// });

// // Upload profile picture endpoint
// app.post("/api/upload/profile-picture", upload.single("profilePicture"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   // Validate file type
//  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//   res.json({ imageUrl });
// });

// // Serve uploaded files statically
// app.use("/uploads", express.static(uploadDir));

// app.get("/api/users/:firebaseUid", async (req, res) => {
//   // Get user profile by Firebase UID
//   try {
//     const [rows] = await pool.execute(
//       "SELECT * FROM users WHERE firebase_uid = ?",
//       [req.params.firebaseUid]
//     );
//     if (rows.length === 0) return res.status(404).json({ error: "Not found" });
//     res.json(mapUserRowToCamel(rows[0]));
//   } catch (err) {
//     console.error("Error fetching user profile:", err.message);
//     res.status(500).json({ error: "Database error", details: err.message });
//   }
// });

// app.put("/api/users/:firebaseUid", async (req, res) => {
//   // Update user profile
//   const { firebaseUid } = req.params;
//   const {
//     firstName,
//     middleName,
//     lastName,
//     age,
//     city,
//     state,
//     gender,
//     customGender,
//     profilePicture,
//     preferences,
//     bio,
//   } = req.body;

//   function toNull(value) {
//     return value === undefined || value === null || value === "" ? null : value;
//   }
//   try {
//     const [result] = await pool.execute(
//       `UPDATE users SET
//         first_name = ?, middle_name = ?, last_name = ?, age = ?, city = ?, state = ?, gender = ?, custom_gender = ?, profile_picture = ?, preferences = ?, bio = ?
//        WHERE firebase_uid = ?`,
//       [
//         toNull(firstName),
//         toNull(middleName),
//         toNull(lastName),
//         toNull(age),
//         toNull(city),
//         toNull(state),
//         toNull(gender),
//         toNull(customGender),
//         toNull(profilePicture),
//         JSON.stringify(preferences ?? {}),
//         toNull(bio),
//         toNull(firebaseUid),
//       ]
//     );
//     // Fetch the updated user
//     const [rows] = await pool.execute(
//       "SELECT * FROM users WHERE firebase_uid = ?",
//       [firebaseUid]
//     );
//     if (rows.length === 0) return res.status(404).json({ error: "Not found" });
//     res.json(mapUserRowToCamel(rows[0])); // <-- SEND RESPONSE HERE
//   } catch (err) {
//     console.error("Error updating user profile:", err.message);
//     res.status(500).json({ error: "Database error", details: err.message });
//   }
// });

// // Create user profile
// app.post("/api/users", async (req, res) => {
//   const {
//     firebaseUid,
//     firstName,
//     middleName,
//     lastName,
//     age,
//     city,
//     state,
//     gender,
//     customGender,
//     profilePicture,
//     preferences,
//     bio,
//   } = req.body;

//   // Log the incoming request body for debugging
//   console.log("Received profile data:", req.body);
//   function toNull(value) {
//     return value === undefined || value === null || value === "" ? null : value;
//   }
//   try {
//     const [result] = await pool.execute(
//       `INSERT INTO users (firebase_uid,role, first_name, middle_name, last_name, age, city, state, gender, custom_gender, profile_picture, preferences, bio)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//        ON DUPLICATE KEY UPDATE
//          role=VALUES(role),first_name=VALUES(first_name), middle_name=VALUES(middle_name), last_name=VALUES(last_name),
//          age=VALUES(age), city=VALUES(city), state=VALUES(state), gender=VALUES(gender), custom_gender=VALUES(custom_gender),
//          profile_picture=VALUES(profile_picture), preferences=VALUES(preferences), bio=VALUES(bio)`,
//       [
//         toNull(firebaseUid),
//         toNull(role),
//         toNull(firstName),
//         toNull(middleName),
//         toNull(lastName),
//         toNull(age),
//         toNull(city),
//         toNull(state),
//         toNull(gender),
//         toNull(customGender),
//         toNull(profilePicture),
//         JSON.stringify(preferences ?? {}),
//         toNull(bio),
//       ]
//     );
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Error creating user profile:", err.message);
//     res.status(500).json({ error: "Database error", details: err.message });
//   }
// });

// app.listen(3001, () =>
//   console.log("API server running on http://localhost:3001")
// );

// function mapUserRowToCamel(row) {
//   return {
//     id: row.id,
//     firebaseUid: row.firebase_uid,
//     role: row.role,
//     firstName: row.first_name,
//     middleName: row.middle_name,
//     lastName: row.last_name,
//     age: row.age,
//     city: row.city,
//     state: row.state,
//     gender: row.gender,
//     customGender: row.custom_gender,
//     profilePicture: row.profile_picture,
//     bio: row.bio,
//     preferences:
//       typeof row.preferences === "string"
//         ? JSON.parse(row.preferences)
//         : row.preferences,
//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }
