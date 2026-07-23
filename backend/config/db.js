const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const DIRECT_URI =
  "mongodb://omt898468_db_user:ovOHe8c2CLqBKCVv@ac-ohpkgos-shard-00-00.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-01.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-02.addvkgc.mongodb.net:27017/leaveManagementDB?ssl=true&replicaSet=atlas-ohpkgos-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || DIRECT_URI;

  try {
    const conn = await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Primary connection failed (${error.message}), trying fallback...`);
    try {
      const conn = await mongoose.connect(DIRECT_URI, { serverSelectionTimeoutMS: 5000 });
      console.log(`MongoDB connected via fallback: ${conn.connection.host}`);
    } catch (fallbackErr) {
      console.error("MongoDB connection failed:", fallbackErr.message);
    }
  }
};

module.exports = connectDB;
