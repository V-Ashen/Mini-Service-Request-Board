if (!global.crypto) { global.crypto = require('crypto'); }

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// --- SERVERLESS CONNECTION LOGIC ---
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Configuration for stable cloud connections
  const opts = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000,        // Close sockets after 45 seconds
  };

  cachedDb = await mongoose.connect(MONGO_URI, opts);
  console.log("New MongoDB Connection Established");
  return cachedDb;
}

// Middleware to ensure DB is connected before any route runs
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});
// ------------------------------------

const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('API is running and connected to Database!');
});

// Vercel handles the listening automatically, 
// but we keep this for local testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server listening locally on port ${PORT}`);
    });
}

module.exports = app;