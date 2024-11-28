const express = require('express');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { protect, authorize } = require('../middleware/authMiddleware');

dotenv.config();

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body; 

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,  // 'password' comes from the request body
      role,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log('User not found'); 
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
     
      const isMatch = await user.matchPassword(password);
      
      if (!isMatch) {
        console.log('Password mismatch'); 
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT Token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,  
        { expiresIn: '1h' }
      );
  
      res.json({ token, role: user.role });
    } catch (error) {
      console.error('Error in login route:', error); 
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// Student dashboard
router.get('/student-dashboard', protect, authorize(['student']), (req, res) => {
  res.json({ message: 'Welcome to the Student Dashboard!' });
});

//  Admin dashboard
router.get('/admin-dashboard', protect, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});

//  dashboard
router.get('/company-dashboard', protect, authorize(['company']), (req, res) => {
  res.json({ message: 'Welcome to the Company Dashboard!' });
});

module.exports = router;
