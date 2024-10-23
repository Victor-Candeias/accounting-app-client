import React, { useEffect } from "react";
import classes from "./Month.module.css";
import { GetMonthName } from "../utils/utils";

/**
 * @module components.month.Month
 */
/**
 * Month component that allows the user to select a month from a dropdown list.
 * It initializes with the selected month and updates the parent component when a month is selected.
 *
 * @component
 * @param {Object} props
 * @param {string} props.selectedMonth - The currently selected month.
 * @param {function} props.onSelectMonth - Callback function to handle when a month is selected.
 */
const Month = ({ selectedMonth, onSelectMonth }) => {
  /**
   * Generate month names using the GetMonthName function for the 12 months of the year.
   * 
   * @constant
   * @type {Array.<string>}
   */
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i);
    return GetMonthName(date);
  });

  /**
   * Effect hook to set the default selected month when the component is mounted.
   * It sets the current month as the default selection.
   */
  useEffect(() => {
    onSelectMonth(selectedMonth); // Set the selected month on component mount
  }, []); // Empty dependency array to ensure this runs once on mount

  /**
   * Handle the change event for the dropdown menu, updating the selected month.
   * 
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    onSelectMonth(event.target.value);
  };

  return (
    <>
      <label htmlFor="month-select" className="sr-only">
        Select Month
      </label>{" "}
      {/* Accessibility label for screen readers */}
      <select
        id="month-select" // Added id for accessibility
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
