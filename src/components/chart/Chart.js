import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { numberToMonth } from "../utils/utils";
import classes from "./chart.module.css";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * @module components.chart.Chart
 */
/**
 * LineChart component renders a line chart displaying the running balance
 * of a financial account over time. It dynamically calculates the balance 
 * based on credits and debits provided in the `dataValues` prop.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.dataValues - Array of objects representing transactions with fields: day, month, year, value, and entry (either 'credit' or 'debit')
 * @returns {JSX.Element} JSX for rendering the line chart or a message if no data is available
 */
const LineChart = ({ dataValues }) => {
  // Return a message if there is no data to display
  if (!dataValues[0] || !dataValues[0].value) {
    return <div className="div">No data available!</div>;
  }

  // Initialize with the starting value (convert to the correct format)
  let runningTotal = dataValues[0].value / 100;

  // Calculate the running total over time based on entry type (credit or debit)
  const calculatedValues = dataValues.slice(1).map((item) => {
    if (item.entry === "credit") {
      runningTotal += parseFloat(item.value) / 100; // Add credit
    } else if (item.entry === "debit") {
      runningTotal -= parseFloat(item.value) / 100; // Subtract debit
    }
    return runningTotal;
  });

  // Prepare chart data with X-axis labels and Y-axis values
  const chartData = {
    labels: dataValues.map((item) => `${item.day}/${numberToMonth(item.month)}/${item.year}`), // X-axis labels
    datasets: [
      {
        label: `Balanço do mês: outubro do ano 2024`,
        data: [dataValues[0].value / 100, ...calculatedValues], // Include initial value
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1, // Smoothness of the line
      },
    ],
  };

  // Find the min and max values to adjust y-axis scaling dynamically
  const minValue = Math.min(dataValues[0].value / 100, ...calculatedValues);
  const maxValue = Math.max(dataValues[0].value / 100, ...calculatedValues);

  // Chart configuration options
  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: minValue - 0.1 * Math.abs(minValue), // Add some padding below min value
        suggestedMax: maxValue + 0.1 * Math.abs(maxValue), // Add some padding above max value
        ticks: {
          callback: (value) => {
            // Format y-axis values with Euro symbol
            return `€ ${value.toLocaleString("pt-PT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true, // Automatically skip labels if too many
          maxRotation: 90, // Rotate labels for readability
          minRotation: 45,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            // Format tooltip values with Euro symbol
            return `${context.dataset.label}: €${context.raw.toLocaleString(
              "pt-PT",
              { style: "currency", currency: "EUR" }
            )}`;
          },
        },
      },
    },
  };

  // Render the Line chart component with provided data and options
  return <Line className={classes.div} data={chartData} options={options} />;
};

export default LineChart;
