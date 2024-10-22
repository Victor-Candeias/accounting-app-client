import React, { useState } from "react";
import { validatePassword } from "../utils/utils";

const PasswordStrengthChecker = ({ label, password, setPassword }) => {
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to check password strength (returns a number)
  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return 0; // No strength
    } else if (password.length < 6) {
      return 1; // Weak
    } else if (password.length < 10) {
      return 2; // Moderate
    } else if (validatePassword(password)) {
      return 3; // Strong
    } else {
      return 2; // Moderate
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setPasswordStrength(checkPasswordStrength(inputPassword));
  };

  // Render squares for password strength indicator
  const renderStrengthIndicator = () => {
    return (
      <div className="flex space-x-2 mt-2">
        {/* We will render 3 squares, their color depends on password strength */}
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`h-2 w-8 rounded-full ${
              passwordStrength >= level
                ? level === 3
                  ? "bg-green-600" // Strong (level 3)
                  : level === 2
                  ? "bg-yellow-500" // Moderate (level 2)
                  : "bg-red-500" // Weak (level 1)
                : "bg-gray-300" // Inactive (no strength)
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="password-container">
      {/* Password Input */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">{label}:</label>
        <input
          className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          aria-label={label}
        />
      </div>

      {/* Password Strength Indicator (colored squares) */}
      {password && renderStrengthIndicator()}
    </div>
  );
};

export default PasswordStrengthChecker;
