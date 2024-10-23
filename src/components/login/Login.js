import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddUserToSessionStorage } from "../utils/utils";
import makeRequest, { HttpMethod } from "../utils/apiClient";
import LoginNaveBar from "./LoginNaveBar";

/**
 * @module components.login.Login
 */
/**
 * Login component that allows a user to log in by providing a username and password.
 * Handles form submission, user validation, and redirects to a menu upon successful login.
 *
 * @component
 */
const Login = () => {
  /**
   * Username entered by the user.
   * @type {string}
   */
  const [username, setUsername] = useState("");

  /**
   * Password entered by the user.
   * @type {string}
   */
  const [password, setPassword] = useState("");

  /**
   * Message to display feedback to the user.
   * @type {string}
   */
  const [message, setMessage] = useState("");

  /**
   * Boolean to indicate whether the form is in the loading state.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * Handle the form submission and login process.
   *
   * @async
   * @function
   * @param {Object} e - Event object for form submission.
   * @returns {void}
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation to ensure the username and password fields are not empty
    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      setMessage(""); // Clear previous messages
      setLoading(true); // Set the loading state

      // URL to the backend authentication endpoint
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

      // Make a POST request with the username and password
      const response = await makeRequest(HttpMethod.POST, url, {
        username,
        password,
      });

      console.log("Login successful:", response);

      // Check if the response indicates the user does not exist
      if (Array.isArray(response) && response.length === 0) {
        throw new Error("User doesn't exist!!!");
      }

      // Save user information and token to session storage
      AddUserToSessionStorage(username, response.token);

      // Redirect to the menu page upon successful login
      navigate("/menu");
    } catch (error) {
      console.log(error);
      // Display an error message if the login failed
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <>
      <LoginNaveBar caption={"Register"} link={"/register"} />
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
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

export default Login;
