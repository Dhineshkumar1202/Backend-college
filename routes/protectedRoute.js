const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware'); // Import protect and authorize middlewares
const router = express.Router();

// A route protected for "student" role
router.post('/someStudentRoute', protect, authorize(['student']), (req, res) => {
  res.status(200).json({ message: 'This is a protected route for students' });
});

// A route protected for "admin" role
router.post('/someAdminRoute', protect, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'This is a protected route for admins' });
});

// Another example protected route, for demonstration
router.get('/protected-data', protect, (req, res) => {
  res.status(200).json({ message: 'This is protected data', user: req.user });
});

module.exports = router;
