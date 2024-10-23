import React, { useEffect } from "react";
import classes from "./Year.module.css";
import { GetYearName } from "../utils/utils";
/**
 * @module components.year.Year
 */
/**
 * Year Component
 *
 * This component displays a dropdown menu to select a year from the last 5 years.
 * It sets the current year as the default selected value and allows users to choose a year,
 * passing the selected year back to the parent component.
 *
 * @component
 * @param {Object} props - The props object for the Year component.
 * @param {string} props.selectedYear - The currently selected year.
 * @param {function} props.onSelectYear - The function to update the selected year.
 *
 * @returns {JSX.Element} The rendered Year component.
 *
 * @example
 * <Year selectedYear={selectedYear} onSelectYear={handleSelectYear} />
 */
const Year = ({ selectedYear, onSelectYear }) => {
  // Generate an array of the last 5 years
  const years = Array.from({ length: 2024 - 2018 + 1 }, (_, i) => 2024 - i);

  // Set the current year as the default selected value
  useEffect(() => {
    onSelectYear(GetYearName());
  }, []);

  /**
   * Handles the selection of a year from the dropdown menu.
   *
   * @param {Object} event - The event object triggered on change.
   */
  const handleInputChange = (event) => {
    onSelectYear(event.target.value);
  };

  return (
    <>
      <select
        className={classes["options-year"]}
        value={selectedYear}
        onChange={handleInputChange}
      >
        <option className={classes["options-year"]} value="">
          --Selecione o ano--
        </option>
        {years.map((option, index) => (
          <option className={classes["options-year"]} key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Year;
