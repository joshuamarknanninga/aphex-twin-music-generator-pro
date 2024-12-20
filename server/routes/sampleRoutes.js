// /routes/sampleRoutes.js
const express = require('express');
const router = express.Router();
const { uploadSample } = require('../controllers/sampleController');
const { protect } = require('../middleware/authMiddleware');

// Route to upload a sample to a specific project
router.post('/:projectId/upload', protect, uploadSample);

module.exports = router;
