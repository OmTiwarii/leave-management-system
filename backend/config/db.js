const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  const uri =
    process.env.MONGO_URI ||
    "mongodb://omt898468_db_user:ovOHe8c2CLqBKCVv@ac-ohpkgos-shard-00-00.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-01.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-02.addvkgc.mongodb.net:27017/leaveManagementDB?ssl=true&replicaSet=atlas-ohpkgos-shard-0&authSource=admin&retryWrites=true&w=majority";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
