const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String },
    grade: { type: String },
    department: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
