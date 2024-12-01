const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());


const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({ dest: 'uploads/' });


const applicationRoutes = require('./routes/applicationRoute');
const interviewRoutes = require('./routes/interviewRoute');
const jobRoutes = require('./routes/jobRoute');
const companyRoutes = require('./routes/companyRoute');
const placementDriveRoutes = require('./routes/placementDriveRoute'); 
const recruitmentRoutes = require('./routes/recruitmentRoute'); 
const academicRecordRoutes = require('./routes/academyRecordRoute');
const { protect } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoute');




app.get("/", (req, res) => {
  res.send("College Placement Management System API is running...");
});


app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', protect, jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placement-drives', placementDriveRoutes); 
app.use('/api', recruitmentRoutes); 
app.use('/api', authRoutes);


app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Internal Server Error',
  });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
