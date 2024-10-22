import classes from "./Resume.module.css";

const Resume = ({ label, icon, amount }) => {
  return (
    <table className={classes["container-table"]}>
      <tbody>
        <tr className={classes["container-table-tr"]}>
          <td className={classes["container-table-td"]}>
            <div className={classes["container-resume"]}>
              <div className={classes["fixed-label"]}>{label}</div>
              <div className={classes["flex-icon"]}>
                <img src={icon} alt="Icon 1" width={40} height={40} />
              </div>
            </div>
          </td>
        </tr>
        <tr className={classes["container-table-tr"]}>
          <td className={classes["container-table-td"]}>
            <div className={classes["container-amount"]}>
              {(parseFloat(amount) / 100).toLocaleString("pt-PT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Resume;
