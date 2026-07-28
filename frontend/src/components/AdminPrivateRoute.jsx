import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protect admin routes — only allow if adminData exists in localStorage
 */
function AdminPrivateRoute({ children }) {
  const adminData = localStorage.getItem("adminData");
  if (!adminData) {
    return <Navigate to="/admin-login" />;
  }
  return children;
}

export default AdminPrivateRoute;
