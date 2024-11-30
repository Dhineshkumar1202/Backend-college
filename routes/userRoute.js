const express = require("express");
const { registerUser, loginUser, getStudentProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/student-profile", protect, getStudentProfile);


module.exports = router;
