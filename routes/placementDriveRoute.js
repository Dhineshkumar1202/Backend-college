const express = require('express');
const router = express.Router();

const {
  createPlacementDrive,
  getPlacementDriveReport,
} = require('../controllers/placementDriveController');


router.post('/create', createPlacementDrive);


router.get('/:driveId/report', getPlacementDriveReport);

module.exports = router;
