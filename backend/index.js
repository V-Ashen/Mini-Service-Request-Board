// index.js

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the variables from .env

// Initialize the Express app
const app = express();

// Use middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Allows the server to accept and parse JSON in request bodies

// Get the port and MongoDB URI from environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});