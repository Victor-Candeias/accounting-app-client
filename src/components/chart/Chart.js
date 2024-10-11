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

const LineChart = ({selectedMonth, selectedYear}) => {
  const initialValue = 15000; // Initial value of 1500

  // Your data
  const dataValues = [
    {
      date: "25-10-2024 10:00",
      description: "Entrada 1",
      value: 10000,
      type: "Credit",
      id: 1,
    },
    {
      date: "25-10-2024 10:10",
      description: "Entrada 2",
      value: 23488,
      type: "Debit",
      id: 2,
    },
    {
      date: "25-10-2024 11:00",
      description: "Entrada 1",
      value: 10000,
      type: "Credit",
      id: 3,
    },
    {
      date: "25-10-2024 11:30",
      description: "Entrada 2",
      value: 23488,
      type: "Debit",
      id: 4,
    },
    {
      date: "25-10-2024 12:00",
      description: "Entrada 1",
      value: 10000,
      type: "Credit",
      id: 5,
    },
    {
      date: "25-10-2024 13:00",
      description: "Entrada 2",
      value: 23488,
      type: "Debit",
      id: 6,
    },
    {
      date: "25-10-2024 15:00",
      description: "Entrada 1",
      value: 10000,
      type: "Credit",
      id: 7,
    },
    {
      date: "25-10-2024 17:00",
      description: "Entrada 2",
      value: 23488,
      type: "Debit",
      id: 8,
    },
  ];
  // Calculate the values over time starting with the initial value
  let runningTotal = initialValue / 100; // Initialize with the starting value
  const calculatedValues = dataValues.map((item) => {
    if (item.type === "Credit") {
      runningTotal += item.value / 100; // Add if it's an "Entrada"
    } else if (item.type === "Debit") {
      runningTotal -= item.value / 100; // Subtract if it's a "Saída"
    }
    return runningTotal; // Return the running total for each point
  });

  // Prepare data for chart
  const chartData = {
    labels: dataValues.map((item) => item.date), // Extract the 'date' for labels
    datasets: [
      {
        label: `Balanço do mês: ${selectedMonth} do ano ${selectedYear}`,
        data: calculatedValues, // Use calculated values for the line chart
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1, // Smoothness of the line
      },
    ],
  };

  // Chart options (optional)
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, // Start y-axis based on minimum value in the data
        ticks: {
          callback: (value) => {
            // Format y-axis tick values
            return `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true, // Auto skip labels if there are too many
          maxRotation: 90, // Rotate labels if needed
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
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
