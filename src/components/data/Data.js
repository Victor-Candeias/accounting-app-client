import "./Data.css";
import Delete from "../../assets/icons/delete.png";
import CreditIcon from "../../assets/icons/credit.png";
import DebitIcon from "../../assets/icons/debit.png";

const Data = ({ data, onDeleteEntry }) => {
  console.log(data);

  const handleDelete = (id) => {
    // call delete
    onDeleteEntry(id);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="th" scope="col">
              Data
            </th>
            <th className="th" scope="col">
              Descrição
            </th>
            <th className="th" scope="col">
              Valor
            </th>
            <th className="th" scope="col">
              Tipo
            </th>
            <th className="th" scope="col">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((m) => (
              <tr key={m._id}>
                <td className="td">
                  {m.day}-{m.month}-{m.year}
                </td>
                <td className="td">{m.description}</td>
                <td className="td" style={{ textAlign: "right" }}>
                  {(m.value / 100).toLocaleString("pt-PT", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="td">
                  <img
                    className="align-center"
                    src={m.entry === "credit" ? CreditIcon : DebitIcon}
                    alt={m.entry === "credit" ? "Credit entry" : "Debit entry"}
                    width={25}
                    height={25}
                  />
                </td>
                <td className="td" id={m._id}>
                  <button
                    onClick={() => handleDelete(m._id)}
                    aria-label="Delete entry"
                  >
                    <img src={Delete} alt="Delete" width={25} height={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="td text-center">
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
