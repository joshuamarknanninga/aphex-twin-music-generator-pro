// projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Assume Project model is defined elsewhere
const authMiddleware = require('../middleware/authMiddleware');

// Create a new project
router.post('/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project({ ...req.body, owner: req.user.userId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all projects for the authenticated user
router.get('/projects', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.userId });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
