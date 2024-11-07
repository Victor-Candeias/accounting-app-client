// Import necessary dependencies and components
import { useState } from "react";               // useState hook to manage component state
import CurrencyInput from "./CurrencyInput";    // Custom currency input component
import classes from "./InputData.module.css";   // CSS module for styling

/**
 * InputData Component
 * 
 * Renders a form for inputting data with fields for description, value, and entry type (credit/debit).
 * Handles form validation and submission.
 * 
 * Props:
 * - onHandleSubmit: Function to handle the submission of the form data.
 */
const InputData = ({ onHandleSubmit }) => {
  // State variables to manage the input value and error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");

  /**
   * Updates the state with the entered value after cleaning any non-numeric characters.
   * 
   * @param {string} enterValue - The raw value entered in the CurrencyInput field.
   */
  const handleInputChange = (enterValue) => {
    setValue(enterValue); // Set the cleaned value
  };

  /**
   * Handles form submission and validation.
   * 
   * @param {Event} event - The form submission event.
   */
  const handleOnSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setErrorMessage("");    // Reset any previous error message

    try {
      // Destructure to retrieve form field values
      const { description, options } = event.target;
      const entry = options.value;  // Get the selected radio button's value

      // Validation for entry type selection
      if (!entry) {
        throw new Error("Entry type cannot be null.");
      }

      // Validate that description and value fields are not empty
      if (description.value.trim() === "" || value.trim() === "") {
        throw new Error("Description and value fields cannot be empty.");
      }

      // Create an object to hold the form data
      const formData = {
        description: description.value,
        value: value.replace(',', ''), // Remove comma for numerical format
        entry,
      };

      onHandleSubmit(formData); // Pass form data to the parent handler

      // Reset the form fields after successful submission
      event.target.reset();  // Reset non-controlled fields
      setValue("");          // Clear the controlled input field for value
    } catch (error) {
      console.log(error);         // Log the error for debugging
      setErrorMessage(error.message); // Set error message for user feedback
    }
  };

  return (
    <form id="itemForm" onSubmit={handleOnSubmitForm}>
      <div className={classes["container-input-data"]}>
        
        {/* Description Input Field */}
        <div className={classes["left-input-data"]}>
          <label className={classes["input-label"]}>Descrição</label>
          <input
            id="description"
            className={`${classes["input-input"]} ${classes["input-input-description"]}`}
            type="text"
            placeholder="Inserir Descrição..."
            name="description" // Added name for easier access
          />
        </div>

        {/* Currency Input Field */}
        <div className={classes["left-input-data"]}>
          <label className={classes["input-label"]}>Valor</label>
          <CurrencyInput id="value" handleInputChange={handleInputChange} />
        </div>

        {/* Radio Buttons for Entry Type Selection */}
        <div className={classes["left-input-data"]}>
          <label className={classes["input-label"]}>
            <input
              id="optionCredit"
              className={classes["input-radio"]}
              type="radio"
              name="options"
              value="credit"
              defaultChecked // Default to "credit" option
            />
            &nbsp;&nbsp;Entrada
          </label>

          <label className={classes["input-label"]}>
            <input
              id="optionDebit"
              className={classes["input-radio"]}
              type="radio"
              name="options"
              value="debit"
            />
            &nbsp;&nbsp;Saída
          </label>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className={classes["error-message"]}>
            {errorMessage} {/* Show error message if validation fails */}
          </div>
        )}

        {/* Submit Button */}
        <div className={classes["left-input-data-finish"]}>
          <input className={classes["input-button"]} type="submit" value="Adicionar" />
        </div>
      </div>
    </form>
  );
};

export default InputData;
