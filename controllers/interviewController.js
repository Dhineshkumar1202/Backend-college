const Interview = require('../models/interviewModel');
const Application = require('../models/applicationModel');

exports.scheduleInterview = async (req, res) => {
    const { applicationId, date, location } = req.body;

    try {
     
        if (!applicationId || !date || !location) {
            return res.status(400).json({ message: 'All fields (applicationId, date, location) are required' });
        }

     
        const interview = await Interview.create({
            applicationId,
            date,
            location,
            status: 'scheduled',
        });

       
        await Application.findByIdAndUpdate(applicationId, { interviewId: interview._id });

        res.status(201).json({ message: 'Interview scheduled successfully', interview });
    } catch (error) {
        console.error('Error scheduling interview:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getInterviewById = async (req, res) => {
    const { interviewId } = req.params;

    try {
   
        const interview = await Interview.findById(interviewId);

      
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json(interview);
    } catch (error) {
        console.error('Error fetching interview:', error);
        res.status(500).json({ error: error.message });
    }
};
