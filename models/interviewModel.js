const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'scheduled' } 
});

module.exports = mongoose.model('Interview', interviewSchema);
