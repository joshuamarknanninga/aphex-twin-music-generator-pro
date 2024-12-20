// /controllers/projectController.js
const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'Project name is required' });

    const project = new Project({
      name,
      user: req.user.id,
      samples: [],
    });

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

// Get all projects for a user
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    res.json(project);
  } catch (error) {
    next(error);
  }
};
