import { useState } from "react";
import classes from "./Totals.module.css";
import Resume from "../resume/Resume"
import Credit from "../..//assets/icons/credit.png"; // Credit icon
import Debit from "../../assets/icons/debit.png"; // Debit icon
import Total from "../../assets/icons/total.png"; // Total icon

const Totals = ({ totalAmount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`${classes["botton-top-backgroung"]} ${classes["bottom-top"]} p-4`}
    >
      {/* Label */}
      <label className={classes["label-title"]}>Resumo</label>
      {/* Hamburger Button for Small Screens */}
      <button
        className={classes["hamburger"]}
        onClick={toggleMenu}
        aria-label="Toggle totals menu"
      >
        ☰
      </button>

      {/* Totals Menu (Responsive) */}
      <div className={`${classes["menu"]} ${menuOpen ? classes["menu-open"] : ""}`}>
        <div className={classes["bottom-top-left"]}>
          <Resume
            label="Entradas"
            icon={Credit}
            amount={totalAmount.totalCredits}
          />
        </div>
        <div className={classes["bottom-top-left"]}>
          <Resume
            label="Saídas"
            icon={Debit}
            amount={totalAmount.totalDebits}
          />
        </div>
        <div className={classes["bottom-top-left"]}>
          <Resume label="Total" icon={Total} amount={totalAmount.total} />
        </div>
      </div>
    </div>
  );
};

export default Totals;
