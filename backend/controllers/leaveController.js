const Leave = require("../models/Leave");
const User = require("../models/User");

/**
 * Save leave request
 * @param {Object} req
 * @param {Object} res
 */
const addLeave = async (req, res) => {
  try {
    const { userId, date, reason } = req.body;

    // check required fields
    if (!userId || !date || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new Leave({ userId, date, reason });
    await leave.save();

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Get all leave requests
 * If userId is passed in query, get leaves for that user only
 */
const getLeaves = async (req, res) => {
  try {
    const { userId } = req.query;

    // get leaves for one user or all leaves
    const filter = userId ? { userId } : {};
    const leaveList = await Leave.find(filter).populate("userId", "name email");

    res.status(200).json(leaveList);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Update leave status
 * @param {String} id
 */
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // check status value
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    // reduce leave balance if approved
    if (status === "Approved") {
      await User.findByIdAndUpdate(leave.userId, { $inc: { leaveBalance: -1 } });
    }

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { addLeave, getLeaves, updateLeaveStatus };
