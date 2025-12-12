const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/slots', bookingController.getAvailableSlots);
router.post('/bookings', bookingController.createBooking);
router.get('/bookings/:id', bookingController.getBooking);

module.exports = router;
