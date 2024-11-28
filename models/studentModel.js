const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "student" }, 
  offerAccepted: { type: Boolean, default: false },
});


module.exports = mongoose.model('Student', studentSchema);
