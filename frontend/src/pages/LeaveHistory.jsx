import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeaveForm from "../components/LeaveForm";
import { getLeaves } from "../services/leaveService";

/**
 * LeaveHistoryPage component — combines two things on one screen:
 *   1. A form so the employee can apply for a new leave.
 *   2. A table showing every leave request they have ever submitted,
 *      along with the date, reason, and current approval status.
 */
function LeaveHistoryPage() {
  // leaveList holds the full history of this employee's leave requests
  const [leaveList, setLeaveList] = useState([]);

  // Pull the logged-in employee's profile from the browser's local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  /**
   * Fetches all leave requests that belong to this specific employee
   * and stores them in leaveList so the table can display them.
   */
  const getLeaveList = async () => {
    try {
      const res = await getLeaves(userData._id);
      setLeaveList(res.data);
    } catch {
      // If the request fails, the table will just show the empty state
      console.log("Failed to load leaves");
    }
  };

  // Load the leave history as soon as the page opens
  useEffect(() => {
    getLeaveList();
    // eslint-disable-next-line
  }, []);

  /**
   * Returns a coloured badge element that matches the leave status.
   * Green = Approved, Red = Rejected, Yellow/neutral = Pending.
   *
   * @param {string} status - The approval status of the leave ("Approved", "Rejected", or "Pending")
   * @returns {JSX.Element} A styled badge that shows the current status at a glance
   */
  const getBadge = (status) => {
    if (status === "Approved") return <span className="badge badge-approved">Approved</span>;
    if (status === "Rejected") return <span className="badge badge-rejected">Rejected</span>;
    // Default — no decision has been made yet
    return <span className="badge badge-pending">Pending</span>;
  };

  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        {/* Page title and short description */}
        <div className="page-header">
          <h2>Apply for Leave</h2>
          <p>Submit a new leave request</p>
        </div>

        {/* ── Leave Application Form ─────────────────────────────────────
            The LeaveForm component handles all input and submission logic.
            When a new leave is successfully added, getLeaveList is called
            so the table below refreshes without a full page reload. */}
        <div className="section-card">
          <h3>New Request</h3>
          <LeaveForm userId={userData._id} onLeaveAdded={getLeaveList} />
        </div>

        {/* ── Leave History Table ────────────────────────────────────────
            Lists every leave request this employee has ever submitted.
            If they have never applied, an empty state icon is shown instead. */}
        <div className="section-card">
          <h3>Leave History</h3>

          {leaveList.length === 0 ? (
            /* Friendly placeholder when there are no records yet */
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No leave requests yet.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveList.map((leave) => (
                  <tr key={leave._id}>
                    {/* Format the date as "23 Jul 2026" for readability */}
                    <td>{new Date(leave.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    {/* Reason text is muted so it doesn't compete visually */}
                    <td style={{ color: "var(--text-muted)" }}>{leave.reason}</td>
                    {/* Coloured badge shows approval status instantly */}
                    <td>{getBadge(leave.status)}</td>
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

export default LeaveHistoryPage;
