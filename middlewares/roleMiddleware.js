// middlewares/roleMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authorizeRole = (roles) => {
  return async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying token' });
    }
  };
};

module.exports = authorizeRole;
