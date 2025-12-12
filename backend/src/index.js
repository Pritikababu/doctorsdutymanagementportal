import express from "express";
import cors from "cors";
import patientsRoute from "./routes/patients.js";
import appointmentsRoute from "./routes/appointments.js";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/patients", patientsRoute);
app.use("/api/appointments", appointmentsRoute);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
