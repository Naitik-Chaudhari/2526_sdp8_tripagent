import pkg from "pg";
import dotenv from "dotenv";
import path from "path";

// Load ROOT .env (important for your single .env setup)
dotenv.config({ path: path.resolve("../.env") });

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB connection
pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL (agent_trip_planner_db)");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Error:", err.message);
  });