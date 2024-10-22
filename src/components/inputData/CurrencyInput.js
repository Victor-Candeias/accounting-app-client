import React from "react";
import classes from "./InputData.module.css";
import { formatCurrency } from "../utils/utils";

const CurrencyInput = ({ handleInputChange }) => {
  // Handle raw input changes
  const handleChange = (e) => {
    // Remove all non-numeric characters except decimal point and handle input normally
    // 0 = 48 -> 9 = 57 -> backspace = 8 -> delete = 46
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 8 ||
      e.keyCode === 46
    ) {
      // do nothing
    } else {
      e.keyCode = "\0";
    }
  };

  const handleBlur = (e) => {
    // Formata o valor quando o campo perde o foco
    const rawValue = e.target.value.replace(",", "");

    const formattedValue = formatCurrency(rawValue);

    handleInputChange(formattedValue);
  };

  return (
    <>
      <input
        className={`${classes["input-input"]} ${classes["input-input-amount"]}`}
        type="text"
        //value={formatCurrency(value)}  Display formatted value
        // Handle raw input on change onChange={handleChange}
        // value={value} Mantém o valor atual no estado
        onChange={handleChange} // Atualiza o estado enquanto digita
        onBlur={handleBlur} // Formata o valor ao perder o foco
        placeholder="Enter amount"
      />
    </>
  );
};

export default CurrencyInput;
