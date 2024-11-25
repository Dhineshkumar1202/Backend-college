const express = require('express');
const router = express.Router();
const academicRecordsController = require('../controllers/academyRocordController');

// Route to get academic records for a student by ID
router.get('/academic-records/:studentId', academicRecordsController.getAcademicRecords);

// Route to sync academic records for a student
router.post('/academic-records/:studentId/sync', academicRecordsController.syncAcademicRecords);

module.exports = router;
