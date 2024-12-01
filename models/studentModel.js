const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  branch: { type: String },
  graduationYear: { type: Number },
  status: {
    type: String,
    enum: ['applied', 'interviewed', 'placed', 'not_placed'],
    default: 'applied',
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
