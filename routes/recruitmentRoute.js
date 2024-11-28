const express = require('express');
const { getRecruitmentStatus } = require('../controllers/recruitmentController');
const router = express.Router();

router.get('/recruitment-status', getRecruitmentStatus);

module.exports = router;
