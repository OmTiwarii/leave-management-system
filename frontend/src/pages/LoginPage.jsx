import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!userData.email || !userData.password) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      const res = await loginUser(userData);
      localStorage.setItem("userData", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
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

        <h2 className="auth-title">Sign In</h2>
        <p className="auth-subtitle">Enter your credentials to continue</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={userData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={userData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "8px" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-divider-line">or</div>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div className="auth-footer">
          <Link to="/admin-login">Admin Login →</Link>
        </div>
        <div className="auth-footer" style={{ marginTop: "8px" }}>
          <Link to="/" style={{ color: "var(--text-muted)" }}>← Home</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
