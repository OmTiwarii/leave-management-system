const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const DIRECT_URI =
  "mongodb://omt898468_db_user:ovOHe8c2CLqBKCVv@ac-ohpkgos-shard-00-00.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-01.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-02.addvkgc.mongodb.net:27017/leaveManagementDB?ssl=true&replicaSet=atlas-ohpkgos-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  let uri = process.env.MONGO_URI;
  // If uri is not set or uses +srv (which causes Node DNS SRV lookup bugs), use DIRECT_URI
  if (!uri || uri.includes("+srv")) {
    uri = DIRECT_URI;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection failed (${error.message}), disconnecting and retrying...`);
    try {
      await mongoose.disconnect();
      const conn = await mongoose.connect(DIRECT_URI, { serverSelectionTimeoutMS: 10000 });
      console.log(`MongoDB connected via fallback: ${conn.connection.host}`);
    } catch (fallbackErr) {
      console.error("MongoDB connection failed permanently:", fallbackErr.message);
    }
  }
};

module.exports = connectDB;
