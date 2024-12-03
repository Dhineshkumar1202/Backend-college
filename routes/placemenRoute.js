// routes/placementRoutes.js
const express = require('express');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();


router.get('/student-dashboard', authorizeRole(['student']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Student Dashboard' });
});


router.get('/admin-dashboard', authorizeRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});


router.get('/company-dashboard', authorizeRole(['company']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Company Dashboard' });
});

module.exports = router;
