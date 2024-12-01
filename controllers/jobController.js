
const Job = require('../models/jobModel');
const Company = require('../models/companyModel');


exports.createJob = async (req, res) => {
    console.log(req.body);  
    const { title, description, company, location, applicationDeadline } = req.body;

    if (!title || !description || !company || !location || !applicationDeadline) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const job = await Job.create({
            title,
            description,
            company,
            location,
            applicationDeadline,
        });
        console.log('Created job:', job); 
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        console.error('Error creating job:', error.message);
        res.status(500).json({ error: 'Failed to create job' });
    }
};



exports.getAllJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    try {
        const jobs = await Job.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('company', 'name'); 
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};


exports.getJobsByCompany = async (req, res) => {
    try {
        const companyId = req.user.companyId; 
        const jobs = await Job.find({ company: companyId }).populate('company', 'name');
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching company jobs:', error.message);
        res.status(500).json({ error: 'Failed to fetch company jobs' });
    }
};


exports.getJobById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId).populate('company', 'name');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job:', error.message);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
};


exports.updateJob = async (req, res) => {
    const { jobId } = req.params;
    const { title, description, company, location, applicationDeadline } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

      
        if (job.company.toString() !== req.user.companyId) {
            return res.status(403).json({ message: "You are not authorized to modify this job" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, description, company, location, applicationDeadline },
            { new: true }
        );

        res.status(200).json({ message: 'Job updated successfully', updatedJob });
    } catch (error) {
        console.error('Error updating job:', error.message);
        res.status(500).json({ error: 'Failed to update job' });
    }
};


exports.deleteJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        
        if (job.company.toString() !== req.user.companyId) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }

        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error.message);
        res.status(500).json({ error: 'Failed to delete job' });
    }
};
