// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Example of a protected route for the Student dashboard
router.get('/student-dashboard', protect, authorize(['student']), (req, res) => {
  res.json({ message: 'Welcome to the Student Dashboard!' });
});

// Example of a protected route for the Admin dashboard
router.get('/admin-dashboard', protect, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});

// Example of a protected route for the Company dashboard
router.get('/company-dashboard', protect, authorize(['company']), (req, res) => {
  res.json({ message: 'Welcome to the Company Dashboard!' });
});

module.exports = router;
