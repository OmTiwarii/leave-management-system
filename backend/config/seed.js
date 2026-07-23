const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// add test user and default admin in database
const seedUser = async () => {
  const uri = process.env.MONGO_URI || "mongodb://omt898468_db_user:ovOHe8c2CLqBKCVv@ac-ohpkgos-shard-00-00.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-01.addvkgc.mongodb.net:27017,ac-ohpkgos-shard-00-02.addvkgc.mongodb.net:27017/leaveManagementDB?ssl=true&replicaSet=atlas-ohpkgos-shard-0&authSource=admin&retryWrites=true&w=majority";
  await mongoose.connect(uri);

  // seed regular test user
  const existingUser = await User.findOne({ email: "test@example.com" });
  if (!existingUser) {
    await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      leaveBalance: 20,
    });
    console.log("Test user created");
  } else {
    console.log("Test user already exists");
  }

  // seed default admin
  const existingAdmin = await User.findOne({ email: "omtiwari@gmail.com" });
  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: "omtiwari@gmail.com",
      password: "898996",
      leaveBalance: 0,
      isAdmin: true,
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }

  process.exit();
};

seedUser();

