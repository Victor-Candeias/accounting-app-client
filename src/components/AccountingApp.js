/**
 * AccountingApp Component
 * 
 * This component is responsible for managing the accounting data.
 * It allows users to view, input, and manage their credit and debit transactions.
 * It also fetches data from an API based on selected month and year and displays 
 * the total credits, debits, and overall total.
 * 
 * @component
 * @returns {JSX.Element} The rendered AccountingApp component.
 * 
 * @example
 * <AccountingApp />
 */

import { useNavigate } from "react-router-dom"; // Hook for navigation
import "./AccountingApp.css"; // Styles specific to the AccountingApp component
import Resume from "./resume/Resume"; // Component to display summary information
import InputData from "./inputData/InputData"; // Component for inputting data
import Data from "./data/Data"; // Component for displaying data entries
import Chart from "./chart/Chart"; // Component for displaying chart visualizations
import Credit from "../assets/icons/credit.png"; // Credit icon
import Debit from "../assets/icons/debit.png"; // Debit icon
import Total from "../assets/icons/total.png"; // Total icon
import NavBar from "./nav-bar/NavBar"; // Navigation bar component
import { useState, useEffect } from "react"; // React hooks for state and lifecycle management
import {
  DEFAULT_API_URL,
  GetMonthName,
  GetYearName,
  GetUserToSessionStorage,
  DeleteUserToSessionStorage,
} from "./utils/utils"; // Utility functions for API and session management
import makeRequest, { HttpMethod } from "./utils/apiClient"; // API request utility

// Initial totals state
const totals = {
  totalCredits: 0,
  totalDebits: 0,
  total: 0,
};

/**
 * Main function for the AccountingApp component.
 * 
 * @returns {JSX.Element} The rendered AccountingApp component.
 */
const AccountingApp = () => {
  // State variables
  const [selectedMonth, setSelectedMonth] = useState(GetMonthName()); // Selected month for filtering
  const [selectedYear, setSelectedYear] = useState(GetYearName()); // Selected year for filtering
  const [data, setData] = useState([]); // Data entries for credits and debits
  const [loading, setLoading] = useState(true); // Loading state
  const [totalAmount, setTotalAmount] = useState(totals); // Total calculations
  const navigate = useNavigate(); // Get navigate function for routing

  /**
   * Fetches data from the API based on the selected month and year.
   * Updates the data state and calculates totals.
   * 
   * @async
   * @function fetchData
   */
  const fetchData = async () => {
    try {
      const url = `${DEFAULT_API_URL}/data`; // API endpoint
      const user = GetUserToSessionStorage(); // Retrieve user from session storage

      const params = {
        user: user.user,
        month: selectedMonth,
        year: selectedYear,
      };

      const response = await makeRequest(HttpMethod.GET, url, null, params);
      console.log("Data fetched:", response); // Log the content
      setData(response); // Update data state

      const totalsCopy = { ...totals };

      // Calculate totals for credits and debits
      response.forEach((item) => {
        let value = parseFloat(item.value);

        if (item.entry === "credit") {
          // Update total credits
          totalsCopy.totalCredits += value;
          totalsCopy.total += value; // Update total amount
        } else {
          // Update total debits
          totalsCopy.totalDebits += value;
          totalsCopy.total -= value; // Update total amount
        }
      });

      setTotalAmount(totalsCopy); // Set calculated totals
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Call fetchData on mount and when selectedMonth or selectedYear changes
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    fetchData();
  }, [selectedMonth, selectedYear]); // Update on month/year change

  /**
   * Handles form submission to add a new transaction.
   * 
   * @async
   * @function handleSubmit
   * @param {Object} formData - The data from the form submission.
   */
  const handleSubmit = async (formData) => {
    try {
      const url = `${DEFAULT_API_URL}/data`; // API endpoint
      const user = GetUserToSessionStorage(); // Retrieve user from session storage
      const today = new Date(); // Current date

      // Prepare updated transaction object
      const updatedTransaction = {
        ...formData,
        user: user.user,
        day: today.getDate().toString(),
        month: selectedMonth,
        year: selectedYear,
      };

      await makeRequest(HttpMethod.POST, url, { content: updatedTransaction });
      console.log("Data posted successfully");

      // Fetch updated data after posting
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to update data. Please try again.");
    }
  };

  /**
   * Handles user logout by clearing session data and navigating to the login page.
   */
  const handleLogout = () => {
    DeleteUserToSessionStorage(); // Clear user session data
    navigate("/login"); // Redirect to login page
  };

  /**
   * Updates the selected month state.
   * 
   * @param {string} month - The selected month.
   */
  const handleSelectedMonth = (month) => {
    setSelectedMonth(month); // Update selected month
  };

  /**
   * Updates the selected year state.
   * 
   * @param {string} year - The selected year.
   */
  const handleSelectedYear = (year) => {
    setSelectedYear(year); // Update selected year
  };

  /**
   * Handles the deletion of a data entry by its ID.
   * 
   * @async
   * @function handleDeleteEntry
   * @param {string} id - The ID of the entry to delete.
   */
  const handleDeleteEntry = async (id) => {
    console.log(id);
    try {
      const url = `${DEFAULT_API_URL}/data/${id}`; // API endpoint for deletion

      await makeRequest(HttpMethod.DELETE, url); // Make DELETE request
      console.log("Data deleted successfully");

      // Fetch updated data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  console.log(data); // Log current data state for debugging

  return (
    <div className="container-menu">
      <NavBar
        onUserLogout={handleLogout}
        selectedMonth={selectedMonth}
        onSelectMonth={handleSelectedMonth}
        selectedYear={selectedYear}
        onSelectYear={handleSelectedYear}
      />

      <div className="bottom-top">
        <div className="bottom-top-left">
          <Resume
            label="Entradas"
            icon={Credit}
            amount={totalAmount.totalCredits}
          />
        </div>
        <div className="bottom-top-left">
          <Resume
            label="Saídas"
            icon={Debit}
            amount={totalAmount.totalDebits}
          />
        </div>
        <div className="bottom-top-left">
          <Resume label="Total" icon={Total} amount={totalAmount.total} />
        </div>
      </div>

      <div className="bottom-middle">
        <InputData onHandleSubmit={handleSubmit} />
      </div>

      <div className="bottom-bottom">
        <div className="bottom-left">
          {loading ? (
            <p>Loading data...</p> // Show loading text
          ) : (
            <Data data={data} onDeleteEntry={handleDeleteEntry} />
          )}
        </div>
        <div className="bottom-right">
          {loading ? (
            <p>Loading data...</p> // Show loading text
          ) : (
            <Chart
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              dataValues={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountingApp; // Export the AccountingApp component
