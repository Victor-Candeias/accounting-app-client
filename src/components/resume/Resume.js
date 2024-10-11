import { formatCurrency } from "../utils/utils";
import "./Resume.css";

const Resume = ({ label, icon, amount }) => {
  return (
    <table className="container-table">
      <tbody>
        <tr className="container-table-tr">
          <td className="container-table-td">
            <div className="container-resume">
              <div className="fixed-label">{label}</div>
              <div className="flex-icon">
                <img src={icon} alt="Icon 1" width={40} height={40} />
              </div>
            </div>
          </td>
        </tr>
        <tr className="container-table-tr">
          <td className="container-table-td">
            <div className="container-amount">
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
