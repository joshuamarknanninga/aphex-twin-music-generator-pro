// /controllers/sampleController.js
const Project = require('../models/Project');
const Sample = require('../models/Sample');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/samples/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for audio files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|ogg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Audio Files Only!');
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// Upload a sample to a project
exports.uploadSample = [
  upload.single('sample'),
  async (req, res, next) => {
    try {
      const projectId = req.params.projectId;
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      if (project.user.toString() !== req.user.id)
        return res.status(401).json({ message: 'Not authorized' });

      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const sample = new Sample({
        name: req.file.filename,
        url: `/uploads/samples/${req.file.filename}`,
        project: projectId,
      });

      const savedSample = await sample.save();

      project.samples.push(savedSample._id);
      await project.save();

      res.status(201).json(savedSample);
    } catch (error) {
      next(error);
    }
  },
];
