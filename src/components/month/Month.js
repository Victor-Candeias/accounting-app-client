import React, { useEffect } from "react";
import classes from "./Month.module.css";
import { GetMonthName } from "../utils/utils";

const Month = ({ selectedMonth, onSelectMonth }) => {
  // Generate month names
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i);
    return GetMonthName(date);
  });

  // Set the default selected month to the current month
  useEffect(() => {
    onSelectMonth(selectedMonth); // Set it as selected
  }, []); // Dependency array includes monthNames and onSelectMonth

  const handleInputChange = (event) => {
    onSelectMonth(event.target.value);
  };

  return (
    <>
      <label htmlFor="month-select" className="sr-only">
        Select Month
      </label>{" "}
      {/* For accessibility */}
      <select
        id="month-select" // Added an id for better accessibility
        className={classes["options-month"]}
        value={selectedMonth}
        onChange={handleInputChange}
      >
        <option value="">--Selecione o mês--</option>
        {monthNames.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Month;
