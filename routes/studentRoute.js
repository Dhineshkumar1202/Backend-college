const express = require('express');
const { getStudentProfile } = require('../controllers/studentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getStudentProfile);

module.exports = router;
