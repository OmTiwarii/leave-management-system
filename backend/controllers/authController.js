const User = require("../models/User");

/**
 * Login user
 * @param {Object} req
 * @param {Object} res
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // check if user exists
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // send user data back
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      leaveBalance: user.leaveBalance,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Register a new user
 * @param {Object} req
 * @param {Object} res
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // create new user with default 20 leave days
    const user = await User.create({
      name,
      email,
      password,
      leaveBalance: 20,
    });

    // send user data back
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      leaveBalance: user.leaveBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

/**
 * Admin login — only allows users with isAdmin flag
 * @param {Object} req
 * @param {Object} res
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Auto-create / verify omtiwari@gmail.com admin account
    if (cleanEmail === "omtiwari@gmail.com" && password === "898996") {
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
        if (!admin.isAdmin || admin.password !== "898996") {
          admin.password = "898996";
          admin.isAdmin = true;
          await admin.save();
        }
      }
      return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: true,
      });
    }

    // find user and verify admin flag
    const user = await User.findOne({ email: cleanEmail, password });

    if (!user || !user.isAdmin) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    // send admin data back
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

module.exports = { loginUser, registerUser, adminLogin };

