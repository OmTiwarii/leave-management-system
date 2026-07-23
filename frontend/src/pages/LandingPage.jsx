import React from "react";
import { Link } from "react-router-dom";

/**
 * LandingPage component — the first page every visitor sees.
 * It shows the company name, navigation buttons, key features,
 * and a footer with quick links.
 */
function LandingPage() {
  return (
    <div>
      {/* ── Top Navigation Bar ──────────────────────────────────────
          Shows the brand name on the left and an Employee Login
          button on the right so employees can quickly sign in. */}
      <nav className="top-navbar">
        <div className="navbar-brand">
          <span className="brand-main">PANTHARA</span>
          <span className="brand-sub">Technologies</span>
        </div>
        <div className="navbar-links">
          {/* Takes the employee directly to the login page */}
          <Link to="/login" className="btn btn-primary" style={{ padding: "7px 16px" }}>
            Employee Login
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────────
          The big welcome area in the centre of the page.
          Gives visitors three choices: sign up, log in as employee,
          or log in as admin. */}
      <section className="hero">
        <div className="hero-badge">Leave Management System</div>
        <h1 className="hero-title">
          Panthara Technologies
        </h1>
        <div className="hero-actions">
          {/* New users land here first */}
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          {/* Existing employees come back through this button */}
          <Link to="/login" className="btn btn-primary">Employee Login</Link>
          {/* Managers and HR staff use the admin portal */}
          <Link to="/admin-login" className="btn btn-outline">Admin Login</Link>
        </div>
      </section>

      {/* ── Feature Cards ────────────────────────────────────────────
          Three cards that briefly explain what the system can do.
          Each card links to the relevant part of the app. */}
      <section id="features" className="cards-section">
        <div className="cards-grid">

          {/* Card 1 – Apply for Leave */}
          <div className="feature-card">
            <div className="card-icon">📋</div>
            <div className="card-title">Apply for Leave</div>
            <p className="card-desc">
              Submit leave requests in seconds. No paperwork, no hassle.
            </p>
            {/* Directs new users to create an account before applying */}
            <Link to="/signup" className="card-link">Get Started →</Link>
          </div>

          {/* Card 2 – Quick Approvals */}
          <div className="feature-card">
            <div className="card-icon">⚡</div>
            <div className="card-title">Quick Approvals</div>
            <p className="card-desc">
              Admins review and approve or reject requests instantly.
            </p>
            {/* Sends admins straight to their dashboard */}
            <Link to="/admin-login" className="card-link">Admin Panel →</Link>
          </div>

          {/* Card 3 – Balance Tracking */}
          <div className="feature-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Balance Tracking</div>
            <p className="card-desc">
              See total, used, and remaining leave days at a glance.
            </p>
            {/* Employees must log in to see their personal balance */}
            <Link to="/login" className="card-link">View Dashboard →</Link>
          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────
          Shows the company name, the current year, and quick links
          so visitors can navigate without scrolling back up. */}
      <footer className="site-footer">
        <span style={{ fontWeight: 700, letterSpacing: "1px", color: "#111" }}>
          PANTHARA TECHNOLOGIES
        </span>
        {/* The year updates automatically so we never need to edit it */}
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
