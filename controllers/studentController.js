const Student = require("../models/studentModel");
const User = require("../models/studentModel");


const createStudent = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { rollNumber, department, CGPA } = req.body;


    const existingStudent = await Student.findOne({ user: userId });
    if (existingStudent) {
      return res.status(400).json({ error: "Student profile already exists" });
    }

  
    const student = await Student.create({
      user: userId,
      rollNumber,
      department,
      CGPA,
    });

    res.status(201).json({ message: "Student profile created successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const student = await Student.findOne({ user: userId }).populate("user", "-password");
    if (!student) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const updateStudentProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rollNumber, department, CGPA, resume } = req.body;

    const student = await Student.findOneAndUpdate(
      { user: userId },
      { rollNumber, department, CGPA, resume },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    res.status(200).json({ message: "Student profile updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createStudent, getStudentProfile, updateStudentProfile };
