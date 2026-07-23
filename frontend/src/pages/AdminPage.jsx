import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaves, updateLeaveStatus } from "../services/leaveService";

/**
 * AdminPage component — the main control panel for administrators.
 *
 * This page does three things:
 *   1. Shows a summary of all leave requests (total, pending, approved counts).
 *   2. Lists every request in a table with the employee name, date, and reason.
 *   3. Lets the admin approve or reject each request with one click.
 *
 * Access is protected — only users with valid admin credentials saved in
 * local storage can reach this page (enforced by AdminPrivateRoute).
 */
function AdminPage() {
  // leaveList holds all leave requests from all employees
  const [leaveList, setLeaveList] = useState([]);

  const navigate = useNavigate();

  // Read the logged-in admin's profile from local storage
  // Use an empty object as the default so the page doesn't crash if it's missing
  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  /**
   * Fetches every leave request in the system (from all employees)
   * and stores them so the table and stats can be displayed.
   */
  const getAllLeaves = async () => {
    try {
      const res = await getLeaves(); // No userId — returns all leaves
      setLeaveList(res.data);
    } catch {
      // If the fetch fails, the table will simply stay empty
      console.log("Failed to load leaves");
    }
  };

  // Load all leave requests as soon as the admin dashboard opens
  useEffect(() => { getAllLeaves(); }, []);

  /**
   * Sends the updated approval status to the server, then
   * refreshes the leave list so the table reflects the change instantly.
   *
   * @param {string} id     - The unique ID of the leave request to update
   * @param {string} status - The new status to apply ("Approved" or "Rejected")
   */
  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      // Refresh the list so the badge updates without a full page reload
      getAllLeaves();
    } catch {
      console.log("Failed to update status");
    }
  };

  /**
   * Logs the admin out by clearing their session from local storage,
   * then sends them back to the admin login page.
   */
  const handleAdminLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/admin-login");
  };

  /**
   * Returns a coloured badge element that matches the leave status.
   * Green = Approved, Red = Rejected, Yellow/neutral = Pending.
   *
   * @param {string} status - "Approved", "Rejected", or "Pending"
   * @returns {JSX.Element} A small styled badge indicating the current status
   */
  const getBadge = (status) => {
    if (status === "Approved") return <span className="badge badge-approved">Approved</span>;
    if (status === "Rejected") return <span className="badge badge-rejected">Rejected</span>;
    // Default badge shown when no decision has been made yet
    return <span className="badge badge-pending">Pending</span>;
  };

  return (
    <div>
      {/* Admin navbar - shows brand, the logged-in admin's name, and a logout button */}
      <nav className="admin-navbar">
        <div className="nav-brand">PANTHARA · Admin</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="admin-badge">Administrator</span>
          {/* Show which admin is currently signed in */}
          <span style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{adminData.name}</span>
          <button
            onClick={handleAdminLogout}
            className="btn btn-outline"
            style={{ padding: "6px 12px", fontSize: "0.82rem" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="page-wrapper">
        {/* Page title */}
        <div className="page-header">
          <h2>Leave Requests</h2>
          <p>Review and manage employee leave applications</p>
        </div>

        {/* Summary stats - three numbers so the admin can assess the situation at a glance */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            {/* Count every request regardless of status */}
            <div className="stat-value">{leaveList.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            {/* Only count requests that haven't been decided yet */}
            <div className="stat-value">{leaveList.filter(l => l.status === "Pending").length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Approved</div>
            {/* Count only the requests the admin has already approved */}
            <div className="stat-value">{leaveList.filter(l => l.status === "Approved").length}</div>
          </div>
        </div>

        {/* All applications table - full list with employee details and approve/reject buttons.
            Shows an empty placeholder if no one has applied yet. */}
        <div className="section-card">
          <h3>All Applications</h3>

          {leaveList.length === 0 ? (
            /* Friendly placeholder when no employees have applied yet */
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
                    {/* Show the employee's name, or "N/A" if the user data is missing */}
                    <td>{leave.userId ? leave.userId.name : "N/A"}</td>
                    {/* Format the date as "23 Jul 2026" so it's easy to read */}
                    <td>{new Date(leave.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    {/* Reason is muted so the eye is drawn to status and actions */}
                    <td style={{ color: "var(--text-muted)" }}>{leave.reason}</td>
                    {/* Coloured badge shows the current decision at a glance */}
                    <td>{getBadge(leave.status)}</td>
                    <td>
                      {/* Two quick action buttons — Approve (green) and Reject (red) */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          className="action-btn action-approve"
                          onClick={() => handleStatusUpdate(leave._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="action-btn action-reject"
                          onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                        >
                          Reject
                        </button>
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
