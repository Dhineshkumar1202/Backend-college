// protectedRoute.js (server-side)
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware'); // Import protect and authorize middlewares
const router = express.Router();


router.post('/someStudentRoute', protect, authorize(['student']), (req, res) => {
  res.status(200).json({ message: 'This is a protected route for students' });
});


router.post('/someAdminRoute', protect, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'This is a protected route for admins' });
});

module.exports = router;
