const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");
const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists." });
    }

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  
    const company = new Company({
      name,
      email,
      password: hashedPassword,
    });
    await company.save();

    res.status(201).json({ message: "Company registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Server error during registration." });
  }
}); 


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Company not found." });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

 
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
