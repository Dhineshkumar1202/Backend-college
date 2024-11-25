const mongoose = require('mongoose');

// Define the Placement Drive Schema
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
  // Metrics to track the recruitment status
  interviewsConducted: { type: Number, default: 0 },  // Track the number of interviews conducted
  offersMade: { type: Number, default: 0 },           // Track the number of offers made
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PlacementDrive', PlacementDriveSchema);
