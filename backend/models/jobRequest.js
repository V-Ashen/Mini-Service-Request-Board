// models/jobRequest.js

const mongoose = require('mongoose');

const JobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // This field must be provided
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
  },
  contactName: {
    type: String,
  },
  contactEmail: {
    type: String,
    // Basic email format validation
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'], // Value must be one of these
    default: 'Open', // Default value if none is provided
  },
}, {
  // This option automatically adds `createdAt` and `updatedAt` fields
  timestamps: true,
});

module.exports = mongoose.model('JobRequest', JobRequestSchema);