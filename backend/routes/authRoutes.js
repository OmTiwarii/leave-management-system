const express = require("express");
const router = express.Router();
const { loginUser, registerUser, adminLogin } = require("../controllers/authController");

// login route
router.post("/login", loginUser);

// register route
router.post("/register", registerUser);

// admin login route
router.post("/admin-login", adminLogin);

// seed admin route
router.get("/seed-admin", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const User = require("../models/User");
    const uri = "mongodb+srv://omt898468_db_user:ovOHe8c2CLqBKCVv@cluster0.addvkgc.mongodb.net/leaveManagementDB?retryWrites=true&w=majority";
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    }

    let admin = await User.findOne({ email: "omtiwari@gmail.com" });
    if (!admin) {
      admin = await User.create({
        name: "Admin (Om Tiwari)",
        email: "omtiwari@gmail.com",
        password: "898996",
        leaveBalance: 0,
        isAdmin: true,
      });
    } else {
      admin.password = "898996";
      admin.isAdmin = true;
      await admin.save();
    }
    res.json({ message: "Admin account seeded successfully", admin: { email: admin.email, isAdmin: admin.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;

