const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function cleanupDatabase() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/insightwords';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Drop the users collection to remove old indexes
    const db = mongoose.connection.db;
    
    try {
      await db.collection('users').drop();
      console.log('Users collection dropped successfully');
    } catch (error) {
      if (error.message.includes('ns not found')) {
        console.log('Users collection does not exist, no need to drop');
      } else {
        console.error('Error dropping users collection:', error);
      }
    }

    console.log('Database cleanup completed');
    process.exit(0);
  } catch (error) {
    console.error('Database cleanup failed:', error);
    process.exit(1);
  }
}

cleanupDatabase();
