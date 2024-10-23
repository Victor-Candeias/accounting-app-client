import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { validatePassword } from "../utils/utils";
import makeRequest, { HttpMethod } from "../utils/apiClient";
import LoginNaveBar from "./LoginNaveBar";
import PasswordStrengthChecker from "../passwordStrengthChecker/PasswordStrengthChecker";

/**
 * @module components.login.Register
 */
/**
 * Register component for user registration.
 *
 * This component provides a form for users to register by entering a username, password, and repeated password.
 * It includes basic validation, password strength checking, and calls an API to create the user account.
 * 
 * @component
 * @returns {JSX.Element} JSX for the registration form
 */
const Register = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [repeatPassword, setRepeatPassword] = useState(""); // Repeat password state
  const [message, setMessage] = useState(""); // Message state to display validation or error messages
  const [loading, setLoading] = useState(false); // State to track loading state
  const navigate = useNavigate(); // useNavigate hook for navigation

  /**
   * Handles the registration form submission.
   * 
   * It performs form validation and, if successful, sends a POST request to register the user.
   * @param {Event} e - The form submit event
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setLoading(true); // Set loading state

      // Basic validation checks
      if (username.length === 0 || password.length === 0) {
        setMessage("Username and password are required!");
        return;
      }

      if (repeatPassword !== password) {
        setMessage("Passwords must match!");
        return;
      }

      if (!validatePassword(password)) {
        setMessage(
          "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character."
        );
        return;
      }

      // API request to register user
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;
      await makeRequest(HttpMethod.POST, url, {
        username,
        password,
      });

      navigate("/"); // Navigate to home page after successful registration

    } catch (error) {
      console.error("Registration error:", error); // Log errors for debugging
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <>
      {/* Navigation bar with login link */}
      <LoginNaveBar caption={"Login"} link={"/"} />
      
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Registration form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Username field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Username:</label>
            <input
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
          </div>

          {/* Password strength checker */}
          <PasswordStrengthChecker label="Password" password={password} setPassword={setPassword} />

          {/* Repeat password field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Repeat Password:</label>
            <input
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              aria-label="Repeat Password"
            />
          </div>

          {/* Submit button */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Display message for validation errors or success */}
        {message && (
          <p className="text-2xl font-bold mb-6 text-center text-red-500">
            <br />
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Register;
