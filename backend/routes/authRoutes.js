const express = require("express");
const router = express.Router();
const { loginUser, registerUser, adminLogin } = require("../controllers/authController");

// login route
router.post("/login", loginUser);

// register route
router.post("/register", registerUser);

// admin login route
router.post("/admin-login", adminLogin);

module.exports = router;

