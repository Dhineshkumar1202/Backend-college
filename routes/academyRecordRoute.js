const express = require('express');
const router = express.Router();
const academicRecordsController = require('../controllers/academyRocordController');


router.get('/academic-records/:studentId', academicRecordsController.getAcademicRecords);


router.post('/academic-records/:studentId/sync', academicRecordsController.syncAcademicRecords);

module.exports = router;
