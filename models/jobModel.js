// /models/jobModel.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, 
    location: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    applicationDeadline: { type: Date, required: true },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;