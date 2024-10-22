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

const LineChart = ({ dataValues }) => {
  if (!dataValues[0] || !dataValues[0].value) {
    return <div className="div" >No data available!</div>
  }

  // Initialize with the starting value (convert to the correct format)
  let runningTotal = dataValues[0].value / 100;

  // Calculate the running total over time based on entry type
  const calculatedValues = dataValues.slice(1).map((item) => {
    if (item.entry === "credit") {
      runningTotal += parseFloat(item.value) / 100; // Add credit
    } else if (item.entry === "debit") {
      runningTotal -= parseFloat(item.value) / 100; // Subtract debit
    }
    return runningTotal;
  });

  // Prepare chart data
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

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: minValue - 0.1 * Math.abs(minValue), // Add some padding below min
        suggestedMax: maxValue + 0.1 * Math.abs(maxValue), // Add some padding above max
        ticks: {
          callback: (value) => {
            // Format y-axis values with currency symbol
            return `€ ${value.toLocaleString("pt-PT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true, // Skip labels if too many
          maxRotation: 90, // Rotate labels for better readability
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

  return <Line className={classes.div} data={chartData} options={options} />;
};

export default LineChart;
