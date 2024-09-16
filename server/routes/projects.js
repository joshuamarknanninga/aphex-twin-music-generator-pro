// projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Save a new project
router.post('/', async (req, res) => {
  try {
    const { name, data } = req.body;
    const owner = req.user.userId;

    const project = new Project({ name, data, owner });
    await project.save();

    res.status(201).json({ message: 'Project saved successfully', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects for the authenticated user
router.get('/', async (req, res) => {
  try {
    const owner = req.user.userId;
    const projects = await Project.find({ owner });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific project by ID
router.get('/:id', async (req, res) => {
  try {
    const owner = req.user.userId;
    const project = await Project.findOne({ _id: req.params.id, owner });

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const owner = req.user.userId;
    const { name, data } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner },
      { name, data },
      { new: true }
    );

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const owner = req.user.userId;

    const project = await Project.findOneAndDelete({ _id: req.params.id, owner });

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
