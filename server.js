const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "CRUD",
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// CRUD Operations

// Create
app.post("/add", (req, res) => {
  const { name, age } = req.body;
  const query = "INSERT INTO users (name, age) VALUES (?, ?)";
  db.query(query, [name, age], (err, result) => {
    if (err) throw err;
    res.send("User added successfully.");
  });
});

// Read
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update
app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const query = "UPDATE users SET name = ?, age = ? WHERE id = ?";
  db.query(query, [name, age, id], (err, result) => {
    if (err) throw err;
    res.send("User updated successfully.");
  });
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send("User deleted successfully.");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
