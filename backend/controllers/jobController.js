// controllers/jobController.js

const JobRequest = require('../models/jobRequest');

// GET /api/jobs - List all jobs with filtering
exports.getAllJobs = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }
    const jobs = await JobRequest.find(filters).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// POST /api/jobs - Create a new job
exports.createJob = async (req, res) => {
  try {
    const newJob = new JobRequest(req.body);
    // Basic validation
    if (!newJob.title || !newJob.description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// GET /api/jobs/:id - Fetch a single job
exports.getJobById = async (req, res) => {
    try {
        const job = await JobRequest.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error });
    }
};

// PATCH /api/jobs/:id - Update status only
exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedJob = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true } // new: true returns the updated document
        );
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job status', error });
    }
};

// DELETE /api/jobs/:id - Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error });
    }
};