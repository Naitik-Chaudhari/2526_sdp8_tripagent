import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { pool } from "./database/db.js";
import tripRoutes from "./routes/tripRoutes.js";

import { fileURLToPath } from "url";

// Fix for ES Modules (__dirname not available)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Load ROOT .env (one .env for entire project)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// dotenv.config({ path: path.resolve("../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Log incoming authorization for debugging
app.use((req, res, next) => {
  if (req.headers.authorization) {
    const header = req.headers.authorization;
    console.log("🔍 Auth Header (first 60 chars):", header.substring(0, 60));
    console.log("🔍 Auth Header length:", header.length);
  }
  next();
});

app.use("/api/trips", tripRoutes);

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
      [clerkId],
    );

    if (existingUser.rows.length === 0) {
      await pool.query("INSERT INTO users (clerk_id, email) VALUES ($1, $2)", [
        clerkId,
        email,
      ]);

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

// Just for testing later remove this

app.post("/api/test-trip", async (req, res) => {
  try {
    const testTrip = {
      destination: "Goa",
      days: 3,
      flights: [{ airline: "Indigo", price: 4500 }],
      hotels: [{ name: "Taj Resort", price: 8000 }],
      itinerary: [
        { day: 1, activity: "Beach Visit" },
        { day: 2, activity: "Water Sports" },
      ],
      weather: { temp: "28°C", condition: "Sunny" },
    };

    const result = await pool.query(
      `INSERT INTO trips (clerk_id, title, trip_data)
       VALUES ($1, $2, $3)
       RETURNING *`,
      ["test_user_123", "Backend Test Trip", testTrip],
    );

    res.json({
      success: true,
      message: "Test trip stored",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Test insert failed" });
  }
});
