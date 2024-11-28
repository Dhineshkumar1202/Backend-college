const mongoose = require('mongoose');


const PlacementDriveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  studentsParticipating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  interviews: [
    {
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      status: { type: String, enum: ['Scheduled', 'Completed', 'Offer Made'], default: 'Scheduled' },
    }
  ],
 
  interviewsConducted: { type: Number, default: 0 }, 
  offersMade: { type: Number, default: 0 },          
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PlacementDrive', PlacementDriveSchema);
