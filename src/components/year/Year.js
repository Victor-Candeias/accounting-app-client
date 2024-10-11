import React, { useEffect } from "react";
import "./Year.css";
import { GetYearName } from "../utils/utils";

const Year = ({ selectedYear, onSelectYear }) => {
  // get last 5 years
  const years = Array.from({ length: 2024 - 2018 + 1 }, (_, i) => 2024 - i);

  // Set the current month as the default selected value
  useEffect(() => {
    onSelectYear(GetYearName());
  }, []);

  const handleInputChange = (event) => {
    onSelectYear(event.target.value);
  };

  
  return (
    <>
      <select className="options-year" value={selectedYear} onChange={handleInputChange}>
        <option className="options-year" value="">--Selecione o ano--</option>
        {years.map((option, index) => (
          <option className="options-year" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Year;
