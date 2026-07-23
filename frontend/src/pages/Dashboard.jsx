import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLeaves } from "../services/leaveService";

function Dashboard() {
  const [usedLeave, setUsedLeave] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getUsedLeave = async () => {
    try {
      const res = await getLeaves(userData._id);
      const approved = res.data.filter((l) => l.status === "Approved");
      setUsedLeave(approved.length);
    } catch {
      console.log("Failed to load leave data");
    }
  };

  useEffect(() => {
    getUsedLeave();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-header">
          <h2>Welcome, {userData.name}</h2>
          <p>Your leave balance overview</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Days</div>
            <div className="stat-value">{userData.leaveBalance + usedLeave}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Used</div>
            <div className="stat-value">{usedLeave}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining</div>
            <div className="stat-value">{userData.leaveBalance}</div>
          </div>
        </div>

        {/* Quick Action */}
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
