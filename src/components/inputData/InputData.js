import { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import classes from "./InputData.module.css";

const InputData = ({ onHandleSubmit }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");

  // Handle change event for the input field
  const handleInputChange = (enterValue) => {
    // Update the state with the raw number (removing non-numeric characters)
    setValue(enterValue);
  };

  const handleOnSubmitForm = (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const { description, options } = event.target; // Destructure to get values
      const entry = options.value; // Get selected radio input

      // Validate entry type
      if (!entry) {
        throw new Error("Entry type cannot be null.");
      }

      // Validate description and value
      if (description.value.trim() === "" || value.trim() === "") {
        throw new Error("Description and value fields cannot be empty.");
      }

      // Pass the form data to onHandleSubmit
      const formData = {
        description: description.value,
        value: value.replace(',', ''),
        entry,
      };

      onHandleSubmit(formData);

      // Reset the form after submission
      event.target.reset(); // Resets all non-controlled fields (e.g., radio buttons)
      setValue(""); // Reset the value field to empty
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message); // Set error message for UI feedback
    }
  };

  return (
    <form id="itemForm" onSubmit={handleOnSubmitForm}>
      <div className={classes["container-input-data"]}>
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

        <div className={classes["left-input-data"]}>
          <label className={classes["input-label"]}>Valor</label>
          <CurrencyInput id="value" handleInputChange={handleInputChange} />
        </div>

        <div className={classes["left-input-data"]}>
          <label className={classes["input-label"]}>
            <input
              id="optionCredit"
              className={classes["input-radio"]}
              type="radio"
              name="options"
              value="credit"
              defaultChecked // Default to credit
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

        {errorMessage && (
          <div className={classes["error-message"]}>
            {errorMessage} {/* Display error message to user */}
          </div>
        )}

        <div className={classes["left-input-data-finish"]}>
          <input className={classes["input-button"]} type="submit" value="Adicionar" />
        </div>
      </div>
    </form>
  );
};

export default InputData;
