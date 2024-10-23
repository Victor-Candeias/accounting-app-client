// Importing CSS classes from the Resume.module.css file.
// These classes are used to style the table and its elements in the Resume component.
import classes from "./Resume.module.css";

/**
 * @module components.resume.Resume
 */
/**
 * Resume Component
 * 
 * @param {string} label - The label to display in the resume.
 * @param {string} icon - The URL of the icon image.
 * @param {number} amount - The amount to be displayed, formatted as a currency value.
 * @returns JSX structure representing a table with label, icon, and formatted amount.
 */
const Resume = ({ label, icon, amount }) => {
  return (
    // Applying class to the table container
    <table className={classes["container-table"]}>
      <tbody>
        <tr className={classes["container-table-tr"]}>
          <td className={classes["container-table-td"]}>
            <div className={classes["container-resume"]}>
              {/* Label section with fixed positioning */}
              <div className={classes["fixed-label"]}>{label}</div>

              {/* Icon section with flexible alignment */}
              <div className={classes["flex-icon"]}>
                {/* Displaying the icon with specified width and height */}
                <img src={icon} alt="Icon 1" width={40} height={40} />
              </div>
            </div>
          </td>
        </tr>
        <tr className={classes["container-table-tr"]}>
          <td className={classes["container-table-td"]}>
            <div className={classes["container-amount"]}>
              {/* Formatting the amount to a currency string with two decimal places */}
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
