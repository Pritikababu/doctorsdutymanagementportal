const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create doctor
router.post('/doctors', adminController.createDoctor);

// Create slot
router.post('/slots', adminController.createSlot);

// List all doctors and slots
router.get('/doctors', adminController.listDoctors);
router.get('/slots', adminController.listSlots);

module.exports = router;
