const express = require('express');
const { submitApplication, getApplicationsByStudentId } = require('../controllers/applicationController');
const multer = require('multer');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/resumes'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });


router.post('/', upload.single('resume'), submitApplication);


router.get('/:studentId', getApplicationsByStudentId);

module.exports = router;
