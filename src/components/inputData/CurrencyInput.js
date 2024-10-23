import React from "react";
import classes from "./InputData.module.css";
import { formatCurrency } from "../utils/utils";

/**
 * @module components.inputData.CurrencyInput
 */
/**
 * CurrencyInput component for handling user input of currency values.
 * 
 * This component allows users to input a currency value. It removes non-numeric characters,
 * formats the value on blur, and updates the parent component's state using the `handleInputChange` callback.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleInputChange - Function to handle the change and send the formatted value to the parent component.
 * @returns {JSX.Element} JSX for the currency input field
 */
const CurrencyInput = ({ handleInputChange }) => {
  /**
   * Handles raw input changes to restrict non-numeric characters except for backspace and delete.
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    // Allow numeric inputs (0-9), backspace (8), and delete (46)
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 8 ||
      e.keyCode === 46
    ) {
      // Allow valid key presses
    } else {
      e.keyCode = "\0"; // Prevent invalid key presses
    }
  };

  /**
   * Handles the input blur event to format the value as currency when the field loses focus.
   * 
   * @param {Event} e - Blur event
   */
  const handleBlur = (e) => {
    // Remove commas and prepare raw value for formatting
    const rawValue = e.target.value.replace(",", "");

    // Format the raw value as currency
    const formattedValue = formatCurrency(rawValue);

    // Pass the formatted value to the parent component via callback
    handleInputChange(formattedValue);
  };

  return (
    <>
      <input
        className={`${classes["input-input"]} ${classes["input-input-amount"]}`}
        type="text"
        // Handle raw input change and value formatting
        onChange={handleChange} // Handle input typing
        onBlur={handleBlur} // Format the value on blur (focus loss)
        placeholder="Enter amount" // Placeholder for the input field
      />
    </>
  );
};

export default CurrencyInput;
