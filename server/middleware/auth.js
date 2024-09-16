// auth.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.headers['x-auth-token'] || req.headers.authorization?.split(' ')[1];

  // Check if no token
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret');

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { authMiddleware };
