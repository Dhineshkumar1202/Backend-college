const express = require('express');
const router = express.Router();

const {
  createPlacementDrive,
  getPlacementDriveReport,
} = require('../controllers/placementDriveController');

// Route to create a new placement drive
router.post('/create', createPlacementDrive);

// Route to get a placement drive report
router.get('/:driveId/report', getPlacementDriveReport);

module.exports = router;
