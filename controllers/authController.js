const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Student = require('../models/studentModel');

// Signup handler
const signup = async (req, res) => {
    const { username, password, fullName, email, phone, role, branch, graduationYear } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }
  
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }
  
    // Continue with the user creation process
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        password: hashedPassword,
        email,  // Include the email in the user creation
        role,
      });
  
      await user.save();
  
      if (role === 'student') {
        const student = new Student({
          user: user._id,
          fullName,
          email,
          phone,
          branch,
          graduationYear,
        });
  
        await student.save();
      }
  
      return res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  

// JWT generation function
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role }, // Payload data
    'your_jwt_secret_key', // Secret key to sign the token
    { expiresIn: '1h' } // Expiry time (adjust as needed)
  );
};

// Login handler
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // If user is a student, retrieve student details
    if (user.role === 'student') {
      const student = await Student.findOne({ user: user._id });
      return res.status(200).json({
        message: "Login successful",
        token,          // Send token along with student data
        studentData: student
      });
    }

    // Return login success with token
    return res.status(200).json({
      message: "Login successful",
      token,          // Send token along with user data
      userData: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
