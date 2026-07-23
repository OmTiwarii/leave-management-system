/**
 * Check if user is logged in
 */
export const isLoggedIn = () => {
  const userData = localStorage.getItem("userData");
  return userData ? true : false;
};
