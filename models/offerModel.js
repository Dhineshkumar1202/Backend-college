const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  placementDrive: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementDrive', required: true },
  status: { type: String, enum: ['accepted', 'declined', 'pending'], default: 'pending' },
});

module.exports = mongoose.model('Offer', offerSchema);
