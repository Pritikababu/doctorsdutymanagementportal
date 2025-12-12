const db = require('../db');

exports.createDoctor = async (req, res) => {
  const { name, specialization } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO doctors (name, specialization) VALUES ($1,$2) RETURNING *',
      [name, specialization]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.createSlot = async (req, res) => {
  const { doctor_id, start_time, duration_minutes, total_capacity } = req.body;
  const cap = total_capacity || 1;

  try {
    const result = await db.query(
      'INSERT INTO slots (doctor_id, start_time, duration_minutes, total_capacity, available_capacity) VALUES ($1,$2,$3,$4,$4) RETURNING *',
      [doctor_id, start_time, duration_minutes || 15, cap]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.listDoctors = async (req, res) => {
  const result = await db.query('SELECT * FROM doctors ORDER BY created_at DESC');
  res.json(result.rows);
};

exports.listSlots = async (req, res) => {
  const result = await db.query(
    `SELECT s.*, d.name as doctor_name, d.specialization
     FROM slots s JOIN doctors d ON s.doctor_id = d.id
     ORDER BY s.start_time`
  );
  res.json(result.rows);
};
