const mongoose = require("mongoose");
const { type } = require("os");


const studentSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  CGPA: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  resume: {
    type: String, 
    required: false,
  },
  applications: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      status: {
        type: String,
        enum: ["submitted", "reviewed", "shortlisted", "rejected"],
        default: "submitted",
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
