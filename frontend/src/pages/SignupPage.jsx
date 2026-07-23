import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.password) { setError("All fields are required"); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await registerUser(formData);
      localStorage.setItem("userData", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join the leave management system</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "8px" }} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-divider-line">or</div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
        <div className="auth-footer" style={{ marginTop: "8px" }}>
          <Link to="/" style={{ color: "var(--text-muted)" }}>← Home</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
