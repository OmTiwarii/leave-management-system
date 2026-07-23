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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected user routes */}
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

        {/* Protected admin route */}
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
