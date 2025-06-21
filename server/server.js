// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // add support for form data
app.use('/uploads', express.static('uploads')); // serve images

// Routes
console.log('Registering routes...');
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
console.log('Routes registered successfully');

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route Not Found' });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server immediately
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Try cloud MongoDB first, fallback to local
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/insightwords';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('DB Error:', err);
    console.log('Trying local MongoDB...');
    
    // Fallback to local MongoDB
    mongoose.connect('mongodb://localhost:27017/insightwords')
      .then(() => {
        console.log('Local MongoDB connected');
      })
      .catch(localErr => {
        console.error('Local DB Error:', localErr);
        console.log('Server running without database connection...');
        console.log('Note: Authentication will not work without a database');
      });
  });
