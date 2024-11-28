const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
    required: true
  },
  grades: {
    type: Map,
    of: String,
    required: true
  },
  achievements: [String], 
  transcripts: {
    type: String, 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);

module.exports = AcademicRecord;
