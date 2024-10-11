import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddSessionStorageItem,
  GetSessionStorageItem,
  RemoveSessionItem,
  TOKEN_KEY,
  LAST_ACTIVITY_KEY,
} from "../utils/utils";

const AutoLogout = ({ timeout = 300000 }) => {
  const navigate = useNavigate();

  // Store the last activity in sessionStorage to share across tabs
  const updateLastActivity = () => {
    const currentTime = Date.now();
    AddSessionStorageItem(LAST_ACTIVITY_KEY, currentTime.toString());
  };

  const handleLogout = () => {
    RemoveSessionItem(TOKEN_KEY);
    navigate("/login"); // Redirect to login
  };

  useEffect(() => {
    // Check activity across tabs
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
