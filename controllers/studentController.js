const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Assuming the Student model has a `role` field
    res.status(200).json({ message: 'Login successful', token, role: student.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

