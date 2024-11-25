const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Assuming there's a Student model
    required: true
  },
  grades: {
    type: Map,
    of: String, // Key-Value for subjects and grades
    required: true
  },
  achievements: [String], // List of achievements
  transcripts: {
    type: String, // URL to the transcript file or a base64 string for transcript PDF
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);

module.exports = AcademicRecord;
