import React from 'react';
import { getLogsFromLocalStorage } from './utils/logger';

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
  const handleViewLogs = () => {
    getLogsFromLocalStorage();
  };

  return (
    <div>
      <button onClick={handleViewLogs}>View Logs</button>
    </div>
  );
};

export default LogViewer;
