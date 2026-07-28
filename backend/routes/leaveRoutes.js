const express = require("express");
const router = express.Router();
const { addLeave, getLeaves, updateLeaveStatus } = require("../controllers/leaveController");

// leave routes
router.post("/", addLeave);
router.get("/", getLeaves);
router.put("/:id", updateLeaveStatus);

module.exports = router;
