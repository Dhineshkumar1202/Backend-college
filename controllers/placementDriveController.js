const PlacementDrive = require('../models/placementDriveModel');
const Company = require('../models/companyModel'); 


const createPlacementDrive = async (req, res) => {
  const { companyId, title, description, date, location } = req.body;

  try {

    const placementDrive = new PlacementDrive({
      company: companyId,
      title,
      description,
      date,
      location,
      participants: [],
      interviewsConducted: 0,
      offersMade: 0,
    });

    await placementDrive.save();
    res.status(201).json(placementDrive);
  } catch (error) {
    console.error('Error creating placement drive:', error.message);
    res.status(500).json({ message: 'Failed to create placement drive' });
  }
};


const getPlacementDriveReport = async (req, res) => {
  const { driveId } = req.params;

  try {
    const placementDrive = await PlacementDrive.findById(driveId)
      .populate('company')
      .populate('participants');

    if (!placementDrive) {
      return res.status(404).json({ message: 'Placement drive not found' });
    }

    const report = {
      title: placementDrive.title,
      company: placementDrive.company.name,
      date: placementDrive.date,
      participantsCount: placementDrive.participants.length,
      interviewsConducted: placementDrive.interviewsConducted,
      offersMade: placementDrive.offersMade,
    };

    res.status(200).json(report);
  } catch (error) {
    console.error('Error generating placement drive report:', error.message);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};

module.exports = {
  createPlacementDrive,
  getPlacementDriveReport,
};
