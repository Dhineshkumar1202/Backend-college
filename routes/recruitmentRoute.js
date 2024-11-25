const express = require('express');
const { getRecruitmentStatus } = require('../controllers/recruitmentController');
const router = express.Router();

// Route for fetching recruitment status
router.get('/recruitment-status', getRecruitmentStatus);

module.exports = router;
