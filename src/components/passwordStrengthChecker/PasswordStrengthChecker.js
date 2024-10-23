// Importing React and the useState hook from the React library.
// Importing the validatePassword function from the utils folder.
import React, { useState } from "react";
import { validatePassword } from "../utils/utils";

/**
 * @module components.passwordStrengthChecker.PasswordStrengthChecker
 */
/**
 * PasswordStrengthChecker Component
 * 
 * @param {string} label - The label to display above the password input.
 * @param {string} password - The current value of the password.
 * @param {Function} setPassword - Function to update the password state in the parent component.
 * @returns JSX structure representing a password input and strength indicator.
 */
const PasswordStrengthChecker = ({ label, password, setPassword }) => {
  // Local state to track the password strength level (0-3)
  const [passwordStrength, setPasswordStrength] = useState("");

  /**
   * Function to evaluate the strength of the given password.
   * @param {string} password - The password to check.
   * @returns {number} A number representing the password strength: 
   * 0 = None, 1 = Weak, 2 = Moderate, 3 = Strong
   */
  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return 0; // No strength
    } else if (password.length < 6) {
      return 1; // Weak
    } else if (password.length < 10) {
      return 2; // Moderate
    } else if (validatePassword(password)) {
      return 3; // Strong if password meets complexity rules
    } else {
      return 2; // Moderate for long but not complex passwords
    }
  };

  /**
   * Handles the input change for the password field.
   * @param {Event} e - The change event from the password input.
   */
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value; // Get the password input value
    setPassword(inputPassword); // Update the parent component's password state
    setPasswordStrength(checkPasswordStrength(inputPassword)); // Set the password strength based on the new value
  };

  /**
   * Renders the password strength indicator.
   * It displays 3 colored squares representing weak, moderate, or strong passwords.
   */
  const renderStrengthIndicator = () => {
    return (
      <div className="flex space-x-2 mt-2">
        {/* Render 3 squares with dynamic colors based on the password strength */}
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`h-2 w-8 rounded-full ${
              passwordStrength >= level
                ? level === 3
                  ? "bg-green-600" // Strong (green)
                  : level === 2
                  ? "bg-yellow-500" // Moderate (yellow)
                  : "bg-red-500" // Weak (red)
                : "bg-gray-300" // Inactive (gray)
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="password-container">
      {/* Password Input Field */}
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

      {/* Render the password strength indicator if the password is not empty */}
      {password && renderStrengthIndicator()}
    </div>
  );
};

export default PasswordStrengthChecker;
