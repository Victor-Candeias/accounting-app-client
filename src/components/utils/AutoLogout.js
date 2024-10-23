import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddSessionStorageItem,
  GetSessionStorageItem,
  RemoveSessionItem,
  TOKEN_KEY,
  LAST_ACTIVITY_KEY,
} from "../utils/utils";

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * AutoLogout component handles user session management by automatically logging out 
 * the user after a specified timeout due to inactivity.
 * 
 * @memberof components.AutoLogout
 * @param {Object} props - The props object.
 * @param {number} [props.timeout=300000] - The timeout duration in milliseconds 
 *                                            after which the user will be logged out 
 *                                            due to inactivity. Default is 300000ms (5 minutes).
 * @returns {null} Returns null as it does not render anything.
 */
const AutoLogout = ({ timeout = 300000 }) => {
  const navigate = useNavigate();

  /**
   * Updates the last activity timestamp in session storage.
   */
  const updateLastActivity = () => {
    const currentTime = Date.now();
    AddSessionStorageItem(LAST_ACTIVITY_KEY, currentTime.toString());
  };

  /**
   * Logs out the user by removing the token from session storage and 
   * redirecting to the login page.
   */
  const handleLogout = () => {
    RemoveSessionItem(TOKEN_KEY);
    navigate("/login"); // Redirect to login
  };

  useEffect(() => {
    /**
     * Checks the last activity timestamp and logs out the user 
     * if the timeout period has been exceeded.
     */
    const checkLastActivity = () => {
      const storedLastActivity = GetSessionStorageItem(LAST_ACTIVITY_KEY);
      if (
        storedLastActivity &&
        Date.now() - parseInt(storedLastActivity) > timeout
      ) {
        handleLogout(); // Log out immediately if the last activity exceeds the timeout
      }
    };

    // Initial check
    checkLastActivity();

    // Set up an interval to check the last activity
    const interval = setInterval(checkLastActivity, 1000); // Check every second

    // Unified event listener for user activity
    const handleUserActivity = () => {
      updateLastActivity();
    };

    // Add event listener for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Clean up on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [timeout, navigate]);

  return null;
};

export default AutoLogout;
