// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, updateSettings } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.put('/settings', protect, updateSettings);

module.exports = router;
