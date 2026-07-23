import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="top-navbar">
        <div className="navbar-brand">
          <span className="brand-main">PANTHARA</span>
          <span className="brand-sub">Technologies</span>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="btn btn-primary" style={{ padding: "7px 16px" }}>
            Employee Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Leave Management System</div>
        <h1 className="hero-title">
          Panthara Technologies
        </h1>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-primary">Employee Login</Link>
          <Link to="/admin-login" className="btn btn-outline">Admin Login</Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="cards-section">
        <div className="cards-grid">
          <div className="feature-card">
            <div className="card-icon">📋</div>
            <div className="card-title">Apply for Leave</div>
            <p className="card-desc">
              Submit leave requests in seconds. No paperwork, no hassle.
            </p>
            <Link to="/signup" className="card-link">Get Started →</Link>
          </div>
          <div className="feature-card">
            <div className="card-icon">⚡</div>
            <div className="card-title">Quick Approvals</div>
            <p className="card-desc">
              Admins review and approve or reject requests instantly.
            </p>
            <Link to="/admin-login" className="card-link">Admin Panel →</Link>
          </div>
          <div className="feature-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Balance Tracking</div>
            <p className="card-desc">
              See total, used, and remaining leave days at a glance.
            </p>
            <Link to="/login" className="card-link">View Dashboard →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <span style={{ fontWeight: 700, letterSpacing: "1px", color: "#111" }}>
          PANTHARA TECHNOLOGIES
        </span>
        <span>© {new Date().getFullYear()} Leave Management System</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/admin-login">Admin</Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
