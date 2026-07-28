import axios from "axios";

/**
 * Base URL for all leave-related API calls.
 * Automatically appends "/leave" to whatever the root API URL is,
 * so all requests in this file target the /api/leave endpoint.
 */
const API_URL = (process.env.REACT_APP_API_URL || "https://leave-management-system-1-99p4.onrender.com/api") + "/leave";

/**
 * Submits a new leave request to the server on behalf of an employee.
 * The server saves it with a status of "Pending" until an admin decides.
 *
 * @param {Object} leaveData          - The details of the leave request
 * @param {string} leaveData.userId   - The ID of the employee making the request
 * @param {string} leaveData.date     - The date the employee wants off (ISO format)
 * @param {string} leaveData.reason   - A short explanation of why leave is needed
 * @returns {Promise} Axios promise that resolves with the newly created leave record
 */
export const addLeave = (leaveData) => {
  return axios.post(API_URL, leaveData);
};

/**
 * Retrieves leave requests from the server.
 *
 * - If a userId is provided, only that employee's leaves are returned.
 *   (Used on the employee's Leave History page.)
 * - If no userId is given, ALL leaves from every employee are returned.
 *   (Used on the Admin dashboard to show the full list.)
 *
 * @param {string} [userId] - Optional ID of a specific employee to filter by
 * @returns {Promise} Axios promise that resolves with an array of leave records
 */
export const getLeaves = (userId) => {
  // Build the URL — add the query string only when filtering by one user
  const url = userId ? `${API_URL}?userId=${userId}` : API_URL;
  return axios.get(url);
};

/**
 * Updates the approval status of a leave request.
 * Only admins can call this — employees cannot change their own status.
 *
 * @param {string} id     - The unique ID of the leave record to update
 * @param {string} status - The new status to set: "Approved" or "Rejected"
 * @returns {Promise} Axios promise that resolves with the updated leave record
 */
export const updateLeaveStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}`, { status });
};
