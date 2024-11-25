const express = require('express');
const { scheduleInterview, getInterviewById } = require('../controllers/interviewController');
const router = express.Router();

router.post('/', scheduleInterview);


router.get('/:interviewId', getInterviewById);

module.exports = router;
