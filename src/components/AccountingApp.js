import { useNavigate } from "react-router-dom";
import "./AccountingApp.css";
import Resume from "./resume/Resume";
import InputData from "./inputData/InputData";
import Data from "./data/Data";
import Chart from "./chart/Chart";
import Credit from "../assets/icons/credit.png";
import Debit from "../assets/icons/debit.png";
import Total from "../assets/icons/total.png";
import NavBar from "./nav-bar/NavBar";
import { useState, useEffect } from "react";
import {
  DEFAULT_API_URL,
  GetMonthName,
  GetYearName,
  GetUserToSessionStorage,
  DeleteUserToSessionStorage,
} from "./utils/utils";
import makeRequest, { HttpMethod } from "./utils/apiClient";

const totals = {
  totalCredits: 0,
  totalDebits: 0,
  total: 0,
};

const AccountingApp = () => {
  const [selectedMonth, setSelectedMonth] = useState(GetMonthName());
  const [selectedYear, setSelectedYear] = useState(GetYearName());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [totalAmount, setTotalAmount] = useState(totals);
  const navigate = useNavigate(); // Get navigate function

  // Fetch data based on selected month and year
  const fetchData = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const url = `${DEFAULT_API_URL}/data`;
      const user = GetUserToSessionStorage();

      const params = {
        user: user.user,
        month: selectedMonth,
        year: selectedYear,
      };

      const response = await makeRequest(HttpMethod.GET, url, null, params);
      console.log("Data fetched:", response); // Log the content
      setData(response);

      const totalsCopy = { ...totals };

      // calculate
      response.forEach((item) => {
        let value = parseFloat(item.value);

        if (item.entry === "credit") {
          // the total of credits
          totalsCopy.totalCredits += value;

          // total
          totalsCopy.total += value;
        } else {
          // total of debits
          totalsCopy.totalDebits += value;

          // total
          totalsCopy.total -= value;
        }
      });

      setTotalAmount(totalsCopy);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Call fetchData on mount and when selectedMonth or selectedYear changes
  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]); // Dependencies changed to update on month/year change

  const handleSubmit = async (formData) => {
    try {
      const url = `${DEFAULT_API_URL}/data`;
      const user = GetUserToSessionStorage();
      const today = new Date();

      const updatedTransaction = {
        ...formData,
        user: user.user,
        day: today.getDate().toString(),
        month: selectedMonth,
        year: selectedYear,
      };

      await makeRequest(HttpMethod.POST, url, { content: updatedTransaction });
      console.log("Data posted successfully");

      // After posting, fetch the updated data
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to update data. Please try again.");
    }
  };

  const handleLogout = () => {
    DeleteUserToSessionStorage();
    navigate("/login");
  };

  const handleSelectedMonth = (month) => {
    setSelectedMonth(month);
  };

  const handleSelectedYear = (year) => {
    setSelectedYear(year);
  };

  const handleDeleteEntry = async (id) => {
    console.log(id);
    try {
      const url = `${DEFAULT_API_URL}/data/${id}`;

      await makeRequest(HttpMethod.DELETE, url);
      console.log("Data deleted successfully");

      // After posting, fetch the updated data
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  console.log(data);

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

export default AccountingApp;
