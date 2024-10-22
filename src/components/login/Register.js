import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { validatePassword } from "../utils/utils";
import makeRequest, { HttpMethod } from "../utils/apiClient";
import LoginNaveBar from "./LoginNaveBar";
import PasswordStrengthChecker from "../passwordStrengthChecker/PasswordStrengthChecker";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Get navigate function

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setLoading(true); // Start loading

      // Basic validation
      if (username.length === 0 || password.length === 0) {
        setMessage("Username and password are required!");
        return;
      }

      if (repeatPassword !== password) {
        setMessage("Password must be equal!");
        return;
      }

      if (!validatePassword(password)) {
        setMessage(
          "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character."
        );
        return;
      }

      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;

      await makeRequest(HttpMethod.POST, url, {
        username,
        password,
      });

      navigate("/"); // Redirect to home after successful registration
      
    } catch (error) {
      console.error("Registration error:", error); // Log the error for debugging
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <LoginNaveBar caption={"Login"} link={"/"} />
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleRegister}>

          {/* user name */}
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

          {/* password */}
          <PasswordStrengthChecker label="Password" password={password} setPassword={setPassword} />

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Repeat Password:
            </label>
            <input
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              aria-label="Repeat Password"
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Register"}
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

export default Register;
