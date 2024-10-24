import { useEffect, useState } from "react";
import { getLogsFromLocalStorage } from "../utils/logger";

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * LogViewer component that provides a button to view logs.
 *
 * This component retrieves and displays logs stored in local storage
 * when the "View Logs" button is clicked. The logs are fetched using
 * the `getLogsFromLocalStorage` function imported from the logger utility.
 *
 * @memberof components.LogViewer
 * @component
 * @returns {JSX.Element} The rendered LogViewer component.
 */
const LogViewer = () => {
  const [loggerList, setLoggerList] = useState([]);

  useEffect(() => {
    handleViewLogs();
  }, [loggerList]); // Update on month/year change

  const handleViewLogs = () => {
    setLoggerList(getLogsFromLocalStorage());
  };

  return (
    <div style={{ height: "200px", backgroundColor: "black", color: "white" }}>
      <button onClick={handleViewLogs}>View Logs</button>
      <h2>Log Entries</h2>
      <ul>
        {loggerList.map((log, index) => (
          <li key={index}>
            <strong>{new Date(log.timestamp).toLocaleString()}</strong>: {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
