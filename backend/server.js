import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { pool } from "./database/db.js";
import { requireAuth } from "./middleware/clerkAuth.js";

dotenv.config({ path: path.resolve("../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend connected to agent_trip_planner_db");
});
// console.log("🚀 /api/users/sync API HIT");
// console.log("Request Body:", req.body);
// Sync Google Clerk user → PostgreSQL
app.post("/api/users/sync", async (req, res) => {
  try {
    console.log("🚀 /api/users/sync API HIT");
    console.log("Body:", req.body);

    const { email, clerkId } = req.body;

    if (!email || !clerkId) {
      console.log("❌ Missing email or clerkId");
      return res.status(400).json({ error: "Missing email or clerkId" });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE clerk_id = $1",
      [clerkId]
    );

    if (existingUser.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (clerk_id, email) VALUES ($1, $2)",
        [clerkId, email]
      );

      console.log("✅ User inserted into PostgreSQL:", email);
    } else {
      console.log("ℹ️ User already exists:", email);
    }

    res.status(200).json({ message: "User synced successfully" });
  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
