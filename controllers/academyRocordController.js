// controllers/academicRecordsController.js

const AcademicRecord = require('../models/academyRecordModel'); // Assuming AcademicRecord model exists
const Student = require('../models/studentModel'); // Assuming a Student model exists

// GET Academic records of a specific student
exports.getAcademicRecords = async (req, res) => {
    const { studentId } = req.params;

    try {
        // Fetch academic records for the student
        const academicRecord = await AcademicRecord.findOne({ studentId });

        if (!academicRecord) {
            return res.status(404).json({ message: "Academic records not found." });
        }

        // Send academic record data as a response
        res.json(academicRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching academic records." });
    }
};

// POST (Sync) Academic records for a specific student
exports.syncAcademicRecords = async (req, res) => {
    const { studentId } = req.params;
    const { grades, achievements, transcripts } = req.body;

    try {
        // Find the student by studentId
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // Sync the academic record with the provided data
        let academicRecord = await AcademicRecord.findOne({ studentId });

        if (!academicRecord) {
            // Create new academic record if it doesn't exist
            academicRecord = new AcademicRecord({
                studentId,
                grades,
                achievements,
                transcripts
            });
        } else {
            // Update existing academic record
            academicRecord.grades = grades;
            academicRecord.achievements = achievements;
            academicRecord.transcripts = transcripts;
        }

        // Save the academic record
        await academicRecord.save();

        res.status(200).json({
            message: "Academic records synchronized successfully.",
            data: academicRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error synchronizing academic records." });
    }
};
