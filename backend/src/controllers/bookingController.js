const db = require('../db');

exports.getAvailableSlots = async (req, res) => {
  const result = await db.query(
    `SELECT s.*, d.name as doctor_name
     FROM slots s JOIN doctors d ON s.doctor_id = d.id
     WHERE s.start_time > now()
     ORDER BY s.start_time`
  );
  res.json(result.rows);
};

exports.createBooking = async (req, res) => {
  const { slot_id, user_name, user_contact } = req.body;
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // Lock the slot row to prevent race condition
    const slotRes = await client.query(
      'SELECT * FROM slots WHERE id = $1 FOR UPDATE',
      [slot_id]
    );

    if (slotRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Slot not found' });
    }

    const slot = slotRes.rows[0];

    if (slot.available_capacity <= 0) {
      // No capacity
      await client.query('ROLLBACK');
      // Insert a FAILED booking if you want to track
      const failed = await client.query(
        'INSERT INTO bookings (slot_id, user_name, user_contact, status) VALUES ($1,$2,$3,$4) RETURNING *',
        [slot_id, user_name, user_contact, 'FAILED']
      );
      return res.status(409).json({ error: 'Slot full', booking: failed.rows[0] });
    }

    // Create a PENDING booking
    const bookingRes = await client.query(
      'INSERT INTO bookings (slot_id, user_name, user_contact, status) VALUES ($1,$2,$3,$4) RETURNING *',
      [slot_id, user_name, user_contact, 'PENDING']
    );

    // Decrement available capacity
    await client.query(
      'UPDATE slots SET available_capacity = available_capacity - 1 WHERE id = $1',
      [slot_id]
    );

    await client.query('COMMIT');

    const booking = bookingRes.rows[0];

    // For demo: immediately mark CONFIRMED (in real system, might verify payment)
    // We'll mark confirmed here to keep flow short.
    await db.query('UPDATE bookings SET status=$1, updated_at=now() WHERE id=$2', ['CONFIRMED', booking.id]);

    const final = await db.query('SELECT * FROM bookings WHERE id=$1', [booking.id]);
    res.status(201).json(final.rows[0]);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'server error' });
  } finally {
    client.release();
  }
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM bookings WHERE id=$1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
};
