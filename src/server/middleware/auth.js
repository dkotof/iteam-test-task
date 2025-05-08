const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Add user to request object
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

module.exports = { protect }; 