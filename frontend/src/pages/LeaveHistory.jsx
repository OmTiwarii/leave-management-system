import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeaveForm from "../components/LeaveForm";
import { getLeaves } from "../services/leaveService";

function LeaveHistoryPage() {
  const [leaveList, setLeaveList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getLeaveList = async () => {
    try {
      const res = await getLeaves(userData._id);
      setLeaveList(res.data);
    } catch {
      console.log("Failed to load leaves");
    }
  };

  useEffect(() => {
    getLeaveList();
    // eslint-disable-next-line
  }, []);

  const getBadge = (status) => {
    if (status === "Approved") return <span className="badge badge-approved">Approved</span>;
    if (status === "Rejected") return <span className="badge badge-rejected">Rejected</span>;
    return <span className="badge badge-pending">Pending</span>;
  };

  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-header">
          <h2>Apply for Leave</h2>
          <p>Submit a new leave request</p>
        </div>

        <div className="section-card">
          <h3>New Request</h3>
          <LeaveForm userId={userData._id} onLeaveAdded={getLeaveList} />
        </div>

        <div className="section-card">
          <h3>Leave History</h3>
          {leaveList.length === 0 ? (
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
                    <td>{new Date(leave.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td style={{ color: "var(--text-muted)" }}>{leave.reason}</td>
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
