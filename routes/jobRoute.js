
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware'); 


router.post('/jobs', protect, jobController.createJob);
router.get('/jobs', protect, jobController.getAllJobs);
router.get('/jobs/:jobId', protect, jobController.getJobById);
router.put('/jobs/:jobId', protect, jobController.updateJob);
router.delete('/jobs/:jobId', protect, jobController.deleteJob);

module.exports = router;
