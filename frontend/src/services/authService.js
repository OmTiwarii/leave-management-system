import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

/**
 * Login user
 * @param {Object} userData
 */
export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

/**
 * Register a new user
 * @param {Object} userData
 */
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

/**
 * Admin login
 * @param {Object} credentials
 */
export const adminLoginRequest = (credentials) => {
  return axios.post(`${API_URL}/admin-login`, credentials);
};

/**
 * Check if the currently logged-in user is admin
 */
export const isAdmin = () => {
  const data = localStorage.getItem("adminData");
  return data ? true : false;
};

