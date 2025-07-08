import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
function toNull(value) {
  return value === undefined ? null : value;
}

app.use(cors());
app.use(express.json());

app.get("/api/users/:firebaseUid", async (req, res) => {// Get user profile by Firebase UID
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [req.params.firebaseUid]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(mapUserRowToCamel(rows[0]));
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.put("/api/users/:firebaseUid", async (req, res) => {
  // Update user profile
  const { firebaseUid } = req.params;
  const {
    firstName,
    middleName,
    lastName,
    age,
    city,
    state,
    gender,
    customGender,
    profilePicture,
    preferences,
    bio,
  } = req.body;

  try {
    const [result] = await pool.execute(
      `UPDATE users SET
        first_name = ?, middle_name = ?, last_name = ?, age = ?, city = ?, state = ?, gender = ?, custom_gender = ?, profile_picture = ?, preferences = ?, bio = ?
       WHERE firebase_uid = ?`,
      [
        toNull(firstName),
        toNull(middleName),
        toNull(lastName),
        toNull(age),
        toNull(city),
        toNull(state),
        toNull(gender),
        toNull(customGender),
        toNull(profilePicture),
        JSON.stringify(preferences ?? {}),
        toNull(bio),
        toNull(firebaseUid),
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// Create user profile
app.post("/api/users", async (req, res) => {
  const {
    firebaseUid,
    firstName,
    middleName,
    lastName,
    age,
    city,
    state,
    gender,
    customGender,
    profilePicture,
    preferences,
    bio,
  } = req.body;

  // Log the incoming request body for debugging
  console.log("Received profile data:", req.body);

  try {
    const [result] = await pool.execute(
      `INSERT INTO users (firebase_uid, first_name, middle_name, last_name, age, city, state, gender, custom_gender, profile_picture, preferences, bio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         first_name=VALUES(first_name), middle_name=VALUES(middle_name), last_name=VALUES(last_name),
         age=VALUES(age), city=VALUES(city), state=VALUES(state), gender=VALUES(gender), custom_gender=VALUES(custom_gender),
         profile_picture=VALUES(profile_picture), preferences=VALUES(preferences), bio=VALUES(bio)`,
      [
        toNull(firebaseUid),
        toNull(firstName),
        toNull(middleName),
        toNull(lastName),
        toNull(age),
        toNull(city),
        toNull(state),
        toNull(gender),
        toNull(customGender),
        toNull(profilePicture),
        JSON.stringify(preferences ?? {}),
        toNull(bio),
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error creating user profile:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});


app.listen(3001, () =>
  console.log("API server running on http://localhost:3001")
);

function mapUserRowToCamel(row) {
  return {
    id: row.id,
    firebaseUid: row.firebase_uid,
    firstName: row.first_name,
    middleName: row.middle_name,
    lastName: row.last_name,
    age: row.age,
    city: row.city,
    state: row.state,
    gender: row.gender,
    customGender: row.custom_gender,
    profilePicture: row.profile_picture,
    bio: row.bio,
    preferences: typeof row.preferences === 'string' ? JSON.parse(row.preferences) : row.preferences,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}