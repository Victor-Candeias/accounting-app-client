import classes from "./NavBar.module.css";
import Month from "../month/Month";
import Year from "../year/Year";
import { GetUserToSessionStorage } from "../utils/utils";

const NavBar = ({
  onUserLogout,
  selectedMonth,
  onSelectMonth,
  selectedYear,
  onSelectYear,
}) => {
  const currentUser = GetUserToSessionStorage();

  return (
    <div className={`${process.env.REACT_APP_CURRENT_SERVER === "python" ? classes["topnav-python"] : classes["topnav-nodejs"]} ${classes.topnav}`}>
      <label className={`${classes["navbar-label"]} ${classes["app-title"]}`}>Aplicação Financeira</label>

      <div className={classes["center-content"]}>
        <label className={classes["navbar-label"]}>Utilizador: {currentUser.user}</label>
        <div className={classes["search-container"]}>
          <Month selectedMonth={selectedMonth} onSelectMonth={onSelectMonth} />
        </div>
        <div className={classes["search-container"]}>
          <Year selectedYear={selectedYear} onSelectYear={onSelectYear} />
        </div>
      </div>

      <button className={classes["navbar-button"]} onClick={onUserLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
