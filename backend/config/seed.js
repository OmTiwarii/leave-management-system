const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// add test user and default admin in database
const seedUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

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

