const Application = require('../models/applicationModel'); 

exports.submitApplication = async (req, res) => {
    const { studentId, jobId, coverLetter } = req.body;

    if (!studentId || !jobId || !coverLetter) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const application = await Application.create({
            studentId,
            jobId,
            resume: req.file?.path || '',  
            coverLetter,
            status: 'submitted',
        });
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
};

exports.getApplicationsByStudentId = async (req, res) => {
    const { studentId } = req.params;

    try {
        const applications = await Application.find({ studentId });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};
