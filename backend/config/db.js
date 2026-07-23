const mongoose = require("mongoose");
const dns = require("dns");

// Set public DNS servers to resolve MongoDB SRV records reliably
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.log("DNS setServers warning:", e.message);
}

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
