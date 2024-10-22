import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddUserToSessionStorage } from "../utils/utils";
import makeRequest, { HttpMethod } from "../utils/apiClient";
import LoginNaveBar from "./LoginNaveBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      // reset message and set loading state
      setMessage("");
      setLoading(true);

      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
      const response = await makeRequest(HttpMethod.POST, url, {
        username,
        password,
      });

      console.log("Login successful:", response);

      // Check if the method is a valid enum value
      if (Array.isArray(response) && response.length === 0) {
        throw new Error("User doesn't exists!!!");
      }

      // Save user info to session storage
      AddUserToSessionStorage(username, response.token);

      // Navigate to menu
      navigate("/menu");
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
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
            disabled={loading} // Disable button while loading
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
