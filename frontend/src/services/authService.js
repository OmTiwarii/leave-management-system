import axios from "axios";

/**
 * Base URL for all authentication API calls.
 * In production this points to the live Render backend.
 * During local development it can be overridden with a .env file.
 */
const API_URL = process.env.REACT_APP_API_URL || "https://leave-management-system-1-99p4.onrender.com/api";

/**
 * Sends the employee's email and password to the server to sign them in.
 * On success the server returns the user's profile (name, email, leaveBalance).
 *
 * @param {Object} userData         - The login credentials entered by the user
 * @param {string} userData.email   - The employee's registered email address
 * @param {string} userData.password - The employee's password
 * @returns {Promise} Axios promise that resolves with the user's profile data
 */
export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

/**
 * Creates a new employee account on the server.
 * The server responds with the newly created user's profile.
 *
 * @param {Object} userData          - The registration details filled in by the new user
 * @param {string} userData.name     - The employee's full name
 * @param {string} userData.email    - A valid email address (used to log in later)
 * @param {string} userData.password - A password chosen by the employee
 * @returns {Promise} Axios promise that resolves with the new user's profile data
 */
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

/**
 * Sends the admin's credentials to the server's restricted login endpoint.
 * Unlike the regular login, this route checks the isAdmin flag on the account.
 * On success the server returns the admin's profile.
 *
 * @param {Object} credentials          - The credentials entered on the admin login form
 * @param {string} credentials.email    - The admin's email address
 * @param {string} credentials.password - The admin's password
 * @returns {Promise} Axios promise that resolves with the admin's profile data
 */
export const adminLoginRequest = (credentials) => {
  return axios.post(`${API_URL}/admin-login`, credentials);
};

/**
 * Checks whether the current browser session belongs to a signed-in admin.
 * Looks for the adminData key in local storage that gets saved after a
 * successful admin login.
 *
 * @returns {boolean} true if admin data exists in local storage, false otherwise
 */
export const isAdmin = () => {
  const data = localStorage.getItem("adminData");
  return data ? true : false;
};
