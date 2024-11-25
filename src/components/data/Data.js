import classes from "./Data.module.css";
import Delete from "../../assets/icons/delete.png";
import CreditIcon from "../../assets/icons/credit.png";
import DebitIcon from "../../assets/icons/debit.png";
import { numberToMonth } from "../utils/utils";

/**
 * @module components.data.Data
 */
/**
 * Data component renders a table displaying transaction information, 
 * including the date, description, value, type (credit or debit), and actions (delete).
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of transaction data objects
 * @param {Function} props.onDeleteEntry - Callback function to handle the deletion of an entry
 * @returns {JSX.Element} JSX for rendering the transaction table
 */
const Data = ({ data, onDeleteEntry }) => {
  /**
   * Handles the deletion of an entry by invoking the onDeleteEntry callback.
   * 
   * @param {string} id - The ID of the entry to be deleted
   */
  const handleDelete = (id) => {
    onDeleteEntry(id);
  };

  return (
    <div className={classes["table-container"]}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th} scope="col">
              Data
            </th>
            <th className={classes.th} scope="col">
              Descrição
            </th>
            <th className={classes.th} scope="col">
              Valor
            </th>
            <th className={classes.th} scope="col">
              Tipo
            </th>
            <th className={classes.th} scope="col">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((m) => (
              <tr key={m._id}>
                <td className={classes.td}>
                  {m.day}-{m.month}-{m.year}
                </td>
                <td className={classes.td}>{m.description}</td>
                <td className={classes.td} style={{ textAlign: "right" }}>
                  {(m.value / 100).toLocaleString("pt-PT", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className={classes.td}>
                  <img
                    className={classes["align-center"]}
                    src={m.entry === "credit" ? CreditIcon : DebitIcon}
                    alt={m.entry === "credit" ? "Credit entry" : "Debit entry"}
                    width={20}
                    height={20}
                  />
                </td>
                <td className={classes.td} id={m._id}>
                  <button
                    onClick={() => handleDelete(m._id)}
                    aria-label="Delete entry"
                  >
                    <img src={Delete} alt="Delete" width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={`${classes.td} text-center`}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
