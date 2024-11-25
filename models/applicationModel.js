const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resume: { type: String, required: true }, 
    coverLetter: { type: String, required: true },
    status: { type: String, default: 'submitted' }, 
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
