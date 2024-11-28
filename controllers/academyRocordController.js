const AcademicRecord = require('../models/academyRecordModel'); 
const Student = require('../models/studentModel'); 


exports.getAcademicRecords = async (req, res) => {
    const { studentId } = req.params;

    try {
       
        const academicRecord = await AcademicRecord.findOne({ studentId });

        if (!academicRecord) {
            return res.status(404).json({ message: "Academic records not found." });
        }

        
        res.json(academicRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching academic records." });
    }
};

exports.syncAcademicRecords = async (req, res) => {
    const { studentId } = req.params;
    const { grades, achievements, transcripts } = req.body;

    try {
      
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

      
        let academicRecord = await AcademicRecord.findOne({ studentId });

        if (!academicRecord) {
           
            academicRecord = new AcademicRecord({
                studentId,
                grades,
                achievements,
                transcripts
            });
        } else {
            
            academicRecord.grades = grades;
            academicRecord.achievements = achievements;
            academicRecord.transcripts = transcripts;
        }

        
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
