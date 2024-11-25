const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "student" }, // Add the role field
  offerAccepted: { type: Boolean, default: false },
});

// Export the model
module.exports = mongoose.model('Student', studentSchema);
