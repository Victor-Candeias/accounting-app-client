import "./NavBar.css";
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
    <div className="topnav">
      <label className="navbar-label app-title">Aplicação Financeira</label>

      <div className="center-content">
        <label className="navbar-label">Utilizador: {currentUser.user}</label>
        <div className="search-container">
          <Month selectedMonth={selectedMonth} onSelectMonth={onSelectMonth} />
        </div>
        <div className="search-container">
          <Year selectedYear={selectedYear} onSelectYear={onSelectYear} />
        </div>
      </div>

      <button className="navbar-button" onClick={onUserLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
