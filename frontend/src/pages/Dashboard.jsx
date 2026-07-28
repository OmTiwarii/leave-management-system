import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLeaves } from "../services/leaveService";

/**
 * Dashboard component — the home screen an employee sees after logging in.
 *
 * It shows three numbers:
 *   1. Total leave days they were ever given.
 *   2. How many of those days have already been used (Approved leaves).
 *   3. How many days are still available (remaining balance).
 *
 * There is also a quick button to jump straight to the leave application form.
 */
function Dashboard() {
  // usedLeave tracks how many approved leaves this employee has taken
  const [usedLeave, setUsedLeave] = useState(0);

  // Pull the logged-in employee's profile from the browser's local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  /**
   * Fetches all leave requests for this employee, then counts only the
   * ones that have been marked as "Approved" to get the used-leave number.
   */
  const getUsedLeave = async () => {
    try {
      const res = await getLeaves(userData._id);

      // Keep only the leaves that an admin has approved
      const approved = res.data.filter((l) => l.status === "Approved");
      setUsedLeave(approved.length);
    } catch {
      // Silently fail — the stats will just show 0 if the request fails
      console.log("Failed to load leave data");
    }
  };

  // Run once when the page first loads so the stats appear immediately
  useEffect(() => {
    getUsedLeave();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        {/* Greeting header — shows the employee's name so the page feels personal */}
        <div className="page-header">
          <h2>Welcome, {userData.name}</h2>
          <p>Your leave balance overview</p>
        </div>

        {/* Three stat cards showing the employee's leave numbers side by side.
            Total = remaining + used, so the math always adds up. */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Days</div>
            {/* Add remaining balance + used days to get the original total */}
            <div className="stat-value">{userData.leaveBalance + usedLeave}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Used</div>
            {/* Days already taken and approved by an admin */}
            <div className="stat-value">{usedLeave}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining</div>
            {/* Days still available — comes directly from the database */}
            <div className="stat-value">{userData.leaveBalance}</div>
          </div>
        </div>

        {/* Quick action card - takes the employee to the leave form with one click */}
        <div className="section-card">
          <h3>Quick Actions</h3>
          <p style={{ fontSize: "0.875rem", marginBottom: "16px" }}>
            Need time off? Submit a leave request and your manager will review it.
          </p>
          <Link to="/leave" className="btn btn-primary">Apply for Leave</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
