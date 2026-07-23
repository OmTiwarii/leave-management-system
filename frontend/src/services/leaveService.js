import axios from "axios";

const API_URL = (process.env.REACT_APP_API_URL || "https://leave-management-system-1-99p4.onrender.com/api") + "/leave";

/**
 * Save leave request
 * @param {Object} leaveData
 */
export const addLeave = (leaveData) => {
  return axios.post(API_URL, leaveData);
};

/**
 * Get leaves. Pass userId to get leaves for one user
 * @param {String} userId
 */
export const getLeaves = (userId) => {
  const url = userId ? `${API_URL}?userId=${userId}` : API_URL;
  return axios.get(url);
};

/**
 * Update leave status
 * @param {String} id
 * @param {String} status
 */
export const updateLeaveStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}`, { status });
};
