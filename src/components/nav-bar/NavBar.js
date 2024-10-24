// Importing CSS classes from the NavBar.module.css file for styling the NavBar.
// Importing the Month and Year components for selecting the month and year.
// Importing the GetUserToSessionStorage function to retrieve the current user from session storage.
import classes from "./NavBar.module.css";
import Month from "../month/Month";
import Year from "../year/Year";
import { GetUserToSessionStorage } from "../utils/utils";

/**
 * @module components.nav-bar.NaveBar
 */
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

  return (
    <div
      className={`${process.env.REACT_APP_CURRENT_SERVER === "python" ? classes["topnav-python"] : classes["topnav-nodejs"]} ${classes.topnav}`}
    >
      {/* Application Title */}
      <label className={`${classes["navbar-label"]} ${classes["app-title"]}`}>
        Aplicação Financeira
      </label>

      {/* Center section containing user information and selectors for month and year */}
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
  );
};

export default NavBar;
