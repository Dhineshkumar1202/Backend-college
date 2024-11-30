// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');


router.get('/student-dashboard', protect, authorize(['student']), (req, res) => {
  res.json({ message: 'Welcome to the Student Dashboard!' });
});


router.get('/admin-dashboard', protect, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});


router.get('/company-dashboard', protect, authorize(['company']), (req, res) => {
  res.json({ message: 'Welcome to the Company Dashboard!' });
});

module.exports = router;
