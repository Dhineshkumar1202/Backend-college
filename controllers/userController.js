const User = require("../models/userModel");
const Student = require("../models/studentModel"); // Import the Student model
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, rollNumber, department, CGPA } = req.body;
  console.log('Request body:', req.body);  // Log the incoming data

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({email, password, role });
  console.log('User created:', user);  // Log the created user

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // If role is student, create a student profile
  if (role === "student") {
    const studentProfile = await Student.create({
      name,
      user: user._id, // Associate the student with the created user
      rollNumber,
      department,
      CGPA,
    });
    console.log('Student profile created:', studentProfile);  // Log the student profile

    if (!studentProfile) {
      res.status(400);
      throw new Error("Failed to create student profile");
    }
  }

  // Send success response
  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id, user.role),  // Pass role to JWT token generation
  });
});

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get User Profile
const getStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the user
  const user = await User.findById(userId).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find the student profile (if role is student)
  let studentProfile = null;
  if (user.role === "student") {
    studentProfile = await Student.findOne({ user: userId });
  }

  res.json({
    user,
    studentProfile,
  });
});

module.exports = { registerUser, loginUser, getStudentProfile };
