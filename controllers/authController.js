const User = require('../models/userModel');
const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateToken } = require('../utils/jwtUtils');


const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, role, username, department, grade, resume } = req.body;

    if (!name || !email || !password || !role) {
      throw new Error('Name, email, password, and role are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 
    if (['admin', 'company'].includes(role) && !username) {
      throw new Error('Username is required for admin or company roles');
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      username: role !== 'student' ? username : undefined, 
    });

    const savedUser = await user.save({ session });

 
    let student = null;
    if (role === 'student') {
      if (!department || !grade) {
        throw new Error('Department and grade are required for student registration');
      }
      student = new Student({
        userId: savedUser._id,
        department,
        grade,
        resume,
      });
      await student.save({ session });
    }

   
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'User registered successfully',
      user,
      student, 
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginUser, register };
