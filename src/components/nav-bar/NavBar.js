import { useState } from "react";
import classes from "./NavBar.module.css";
import Month from "../month/Month";
import Year from "../year/Year";
import { GetUserToSessionStorage } from "../utils/utils";

/**
 * NavBar Component
 * 
 * @param {Function} onUserLogout - Function to handle user logout action.
 * @param {string} selectedMonth - The currently selected month.
 * @param {Function} onSelectMonth - Function to handle month selection change.
 * @param {string} selectedYear - The currently selected year.
 * @param {Function} onSelectYear - Function to handle year selection change.
 * @returns {JSX.Element} JSX structure for rendering a navigation bar.
 */
const NavBar = ({
  onUserLogout,
  selectedMonth,
  onSelectMonth,
  selectedYear,
  onSelectYear,
}) => {
  // Retrieving the current user from session storage
  const currentUser = GetUserToSessionStorage();
  
  // State for toggling the hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu state
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className={classes.topnav}
    >
      {/* Application Title */}
      <label className={`${classes["navbar-label"]} ${classes["app-title"]}`}>
        Aplicação Financeira
      </label>

      {/* Hamburger Button for Small Screens */}
      <button
        className={classes["hamburger"]}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Full or Collapsible Navigation Menu */}
      <div
        className={`${classes["menu"]} ${
          menuOpen ? classes["menu-open"] : ""
        }`}
      >
        {/* Center section containing user information and selectors */}
        <div className={classes["center-content"]}>
          {/* Displaying the current user's username */}
          <label className={classes["navbar-label"]}>
            Utilizador: {currentUser.user}
          </label>
          
          {/* Month selection component */}
          <div className={classes["search-container"]}>
            <Month
              selectedMonth={selectedMonth}
              onSelectMonth={onSelectMonth}
            />
          </div>

          {/* Year selection component */}
          <div className={classes["search-container"]}>
            <Year
              selectedYear={selectedYear}
              onSelectYear={onSelectYear}
            />
          </div>
        </div>

        {/* Logout Button */}
        <button className={classes["navbar-button"]} onClick={onUserLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
