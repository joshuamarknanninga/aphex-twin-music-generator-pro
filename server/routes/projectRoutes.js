// /routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Protected Routes
router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectById);

module.exports = router;
