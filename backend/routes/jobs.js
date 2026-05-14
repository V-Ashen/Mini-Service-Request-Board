// routes/jobs.js

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Map routes to controller functions
router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.patch('/:id', jobController.updateJobStatus);
router.delete('/:id', jobController.deleteJob);

module.exports = router;