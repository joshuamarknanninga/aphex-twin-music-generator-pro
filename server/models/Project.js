// /models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  samples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sample',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
