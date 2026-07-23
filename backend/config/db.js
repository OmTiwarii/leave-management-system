const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  const uri =
    process.env.MONGO_URI ||
    "mongodb+srv://omt898468_db_user:ovOHe8c2CLqBKCVv@cluster0.addvkgc.mongodb.net/leaveManagementDB?retryWrites=true&w=majority";

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

module.exports = connectDB;
