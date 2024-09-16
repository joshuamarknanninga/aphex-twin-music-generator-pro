// app.js

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes); // Protected routes under /api

// Example protected route usage
app.use('/api/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
