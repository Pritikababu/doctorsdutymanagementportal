import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM appointments ORDER BY appointment_date ASC, appointment_time ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
