import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLoginRequest } from "../services/authService";

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!credentials.email || !credentials.password) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      const res = await adminLoginRequest(credentials);
      localStorage.setItem("adminData", JSON.stringify(res.data));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="brand-main">PANTHARA</span>
          <span className="brand-sub">Technologies</span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <span className="admin-badge">Admin Portal</span>
        </div>

        <h2 className="auth-title">Admin Sign In</h2>
        <p className="auth-subtitle">Restricted to administrators only</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input type="email" name="email" placeholder="admin@panthara.com" value={credentials.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "8px" }} disabled={loading}>
            {loading ? "Verifying..." : "Admin Sign In"}
          </button>
        </form>

        <div className="auth-divider-line">or</div>

        <div className="auth-footer">
          <Link to="/login">← Employee Login</Link>
        </div>
        <div className="auth-footer" style={{ marginTop: "8px" }}>
          <Link to="/" style={{ color: "var(--text-muted)" }}>← Home</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
