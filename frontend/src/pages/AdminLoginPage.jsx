import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLoginRequest } from "../services/authService";

/**
 * AdminLoginPage component — a restricted sign-in form only for administrators.
 *
 * When the admin submits valid credentials, their profile is saved to local
 * storage and they are redirected to the admin dashboard at /admin.
 * Any wrong credentials show a clear error message below the form.
 */
function AdminLoginPage() {
  // Holds the text the admin types into the email and password fields
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Stores any error message to display if login fails
  const [error, setError] = useState("");

  // Tracks whether an API request is in progress so we can disable the button
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * Syncs the form fields with state as the admin types.
   * Uses the input's `name` attribute as the key, so one handler
   * works for both the email field and the password field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field
   */
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  /**
   * Submits the admin credentials to the server for verification.
   * On success, saves the admin profile to local storage and
   * redirects to the admin dashboard. On failure, shows the
   * error message returned by the server.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const handleAdminLogin = async (e) => {
    // Stop the browser from refreshing the page on form submit
    e.preventDefault();
    setError("");

    // Make sure neither field was left empty before hitting the server
    if (!credentials.email || !credentials.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await adminLoginRequest(credentials);

      // Save the admin profile so other pages know the user is an admin
      localStorage.setItem("adminData", JSON.stringify(res.data));

      // Take the admin to their dashboard
      navigate("/admin");
    } catch (err) {
      // Show the server's error message, or a generic fallback
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      // Re-enable the button whether the request succeeded or failed
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Company logo / brand name at the top of the card */}
        <div className="auth-logo">
          <span className="brand-main">PENTHARA</span>
          <span className="brand-sub">Technologies</span>
        </div>

        {/* Badge that makes it obvious this is the admin-only portal */}
        <div style={{ marginBottom: "20px" }}>
          <span className="admin-badge">Admin Portal</span>
        </div>

        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">Restricted to administrators only</p>

        {/* Error message box — only visible when something went wrong */}
        {error && <div className="error-msg">{error}</div>}

        {/* Login form - email and password fields with a submit button */}
        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@penthara.com"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          {/* Button is disabled while the request is running to prevent double-clicks */}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{ marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Admin Login"}
          </button>
        </form>

        <div className="auth-divider-line">or</div>

        {/* Footer links — lets an admin quickly jump to employee login or go home */}
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
