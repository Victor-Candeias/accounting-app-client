// src/utils/logger.js

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * Logs a message to the browser's local storage.
 *
 * This function retrieves existing logs from local storage, appends a new log entry
 * with a timestamp, and then saves the updated log array back to local storage.
 *
 * @memberof components.logToLocalStorage
 * @param {string} message - The message to log. 
 *                            It should be a descriptive string representing an event or action.
 *
 * @returns {void} This function does not return a value.
 */
export const logToLocalStorage = (message) => {
  const logs = JSON.parse(localStorage.getItem('appLogs')) || [];
  logs.push({ timestamp: new Date().toISOString(), message });
  localStorage.setItem('appLogs', JSON.stringify(logs));
};

/**
 * Retrieves logs from local storage and logs them to the console.
 * 
 * This function attempts to parse the stored logs from local storage under 
 * the key 'appLogs'. If no logs are found, it returns an empty array. 
 * The retrieved logs are then output to the console for review.
 * 
 * @memberof components.getLogsFromLocalStorage
 * @returns {void} This function does not return a value.
 */
export const getLogsFromLocalStorage = () => {
  const logs = JSON.parse(localStorage.getItem('appLogs')) || [];
  console.log(logs); // This will output the logs to the console
};



