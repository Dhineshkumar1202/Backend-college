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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Restrict roles to valid values only
    const validRoles = ['student', 'admin', 'company'];
    const userRole = validRoles.includes(role) ? role : 'admin';

    const newUser = new User({ name, email, password, role: userRole });

   

    await newUser.save();

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
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Dashboards
router.get('/student-dashboard', protect, authorize(['student']), (req, res) => {
  res.json({ message: 'Welcome to the Student Dashboard!' });
});

router.get('/admin-dashboard', protect, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});

router.get('/company-dashboard', protect, authorize(['company']), (req, res) => {
  res.json({ message: 'Welcome to the Company Dashboard!' });
});

module.exports = router;
