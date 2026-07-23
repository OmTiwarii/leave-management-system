import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaves, updateLeaveStatus } from "../services/leaveService";

function AdminPage() {
  const [leaveList, setLeaveList] = useState([]);
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  const getAllLeaves = async () => {
    try {
      const res = await getLeaves();
      setLeaveList(res.data);
    } catch {
      console.log("Failed to load leaves");
    }
  };

  useEffect(() => { getAllLeaves(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      getAllLeaves();
    } catch {
      console.log("Failed to update status");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/admin-login");
  };

  const getBadge = (status) => {
    if (status === "Approved") return <span className="badge badge-approved">Approved</span>;
    if (status === "Rejected") return <span className="badge badge-rejected">Rejected</span>;
    return <span className="badge badge-pending">Pending</span>;
  };

  return (
    <div>
      {/* Admin Navbar */}
      <nav className="admin-navbar">
        <div className="nav-brand">PANTHARA · Admin</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="admin-badge">Administrator</span>
          <span style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{adminData.name}</span>
          <button onClick={handleAdminLogout} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "0.82rem" }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="page-wrapper">
        <div className="page-header">
          <h2>Leave Requests</h2>
          <p>Review and manage employee leave applications</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{leaveList.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{leaveList.filter(l => l.status === "Pending").length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Approved</div>
            <div className="stat-value">{leaveList.filter(l => l.status === "Approved").length}</div>
          </div>
        </div>

        {/* Table */}
        <div className="section-card">
          <h3>All Applications</h3>
          {leaveList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No leave requests submitted yet.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveList.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.userId ? leave.userId.name : "N/A"}</td>
                    <td>{new Date(leave.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td style={{ color: "var(--text-muted)" }}>{leave.reason}</td>
                    <td>{getBadge(leave.status)}</td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button className="action-btn action-approve" onClick={() => handleStatusUpdate(leave._id, "Approved")}>Approve</button>
                        <button className="action-btn action-reject"  onClick={() => handleStatusUpdate(leave._id, "Rejected")}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
