const cron = require('node-cron');
const db = require('../db');

const expire = async () => {
  try {
    // Find pending bookings older than 2 minutes
    const res = await db.query(
      `SELECT id, slot_id FROM bookings
       WHERE status='PENDING' AND created_at < now() - interval '2 minutes'`
    );

    for (const b of res.rows) {
      await db.query('BEGIN');
      try {
        // mark failed
        await db.query('UPDATE bookings SET status=$1, updated_at=now() WHERE id=$2', ['FAILED', b.id]);
        // revert slot capacity
        await db.query('UPDATE slots SET available_capacity = available_capacity + 1 WHERE id=$1', [b.slot_id]);
        await db.query('COMMIT');
      } catch (err) {
        await db.query('ROLLBACK');
        console.error('expire job inner error', err);
      }
    }
  } catch (err) {
    console.error('expire job error', err);
  }
};

module.exports = {
  start: () => {
    // run every 30 seconds
    cron.schedule('*/30 * * * * *', () => {
      expire();
    });
    console.log('Expire booking job started (every 30s)');
  }
};
