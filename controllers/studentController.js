const Student = require('../models/studentModel');

const getStudentProfile = async (req, res) => {
    try {
       
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const student = await Student.findOne({ userId: req.user.id }).populate('userId', 'name email');
        if (!student) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStudentProfile };
