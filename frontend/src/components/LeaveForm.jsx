import React, { useState } from "react";
import { addLeave } from "../services/leaveService";

function LeaveForm({ userId, onLeaveAdded }) {
  const [leaveData, setLeaveData] = useState({ date: "", reason: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(false);
    if (!leaveData.date || !leaveData.reason) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      await addLeave({ userId, ...leaveData });
      setLeaveData({ date: "", reason: "" });
      setSuccess(true);
      onLeaveAdded();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to submit leave request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Leave Date</label>
        <input type="date" name="date" value={leaveData.date} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Reason</label>
        <input type="text" name="reason" placeholder="Brief reason for leave" value={leaveData.reason} onChange={handleChange} />
      </div>
      {error   && <div className="error-msg"   style={{ marginBottom: "12px" }}>{error}</div>}
      {success && <div className="success-msg" style={{ marginBottom: "12px" }}>Leave request submitted successfully.</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

export default LeaveForm;
