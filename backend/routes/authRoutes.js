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
    const User = require("../models/User");
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
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

