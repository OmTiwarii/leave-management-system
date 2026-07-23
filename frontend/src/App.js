import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Dashboard from "./pages/Dashboard";
import LeaveHistoryPage from "./pages/LeaveHistory";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

/**
 * App component — the root of the entire application.
 *
 * This file sets up the client-side router and maps URL paths to the
 * correct page component. There are three types of routes:
 *
 *   1. Public routes — anyone can visit these (landing page, login, sign up).
 *   2. Protected user routes — only logged-in employees can access these.
 *      PrivateRoute checks for a valid user session before rendering the page.
 *   3. Protected admin routes — only admins can access these.
 *      AdminPrivateRoute checks for a valid admin session before rendering.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ─────────────────────────────────────────────
            These pages are open to everyone — no login required. */}
        <Route path="/"            element={<LandingPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/signup"      element={<SignupPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* ── Protected Employee Routes ──────────────────────────────────
            Wrapped in PrivateRoute — if the employee is not logged in they
            are automatically redirected to the login page instead. */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <PrivateRoute>
              <LeaveHistoryPage />
            </PrivateRoute>
          }
        />

        {/* ── Protected Admin Route ──────────────────────────────────────
            Wrapped in AdminPrivateRoute — non-admins are redirected to the
            admin login page if they try to visit /admin directly. */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminPage />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
