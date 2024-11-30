const express = require("express");
const { createStudent, getStudentProfile, updateStudentProfile } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createStudent);
router.get("/", protect, getStudentProfile);
router.put("/", protect, updateStudentProfile);

module.exports = router;
