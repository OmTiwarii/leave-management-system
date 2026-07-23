import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const initials = userData.name
    ? userData.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <nav className="app-navbar">
      <div className="nav-brand">PANTHARA LMS</div>
      <div className="nav-links">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        <Link to="/leave"     className={location.pathname === "/leave"     ? "active" : ""}>Apply Leave</Link>
      </div>
      <div className="nav-right">
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <span>{userData.name || "Employee"}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "0.82rem" }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
