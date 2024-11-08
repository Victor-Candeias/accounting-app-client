// Import date-fns functions and the Portuguese locale
import { parse, format } from "date-fns";
import { pt } from "date-fns/locale";
import bcrypt from "bcryptjs";
import { logToLocalStorage } from "./logger";

export const TOKEN_KEY = "token";
export const LAST_ACTIVITY_KEY = "lastActivity";
export const LOCATION = "pt-PT";
export const DEFAULT_AUTO_LOGOUT_TIMEOUT = 300000;

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * Gets the month name from the current location in full format.
 *
 * @memberof components.GetMonthName
 * @param {Date} [date=new Date()] - The date object to extract the month from.
 * @returns {string} The full name of the month in the current location.
 */
export const GetMonthName = (date = new Date()) => {
  return date.toLocaleString(LOCATION, { month: "long" });
};

/**
 * Gets the current year in "yyyy" format from the current location.
 *
 * @memberof components.GetYearName
 * @returns {string} The year in numeric format (e.g., "2024").
 */
export const GetYearName = () => {
  return new Date().toLocaleString(LOCATION, { year: "numeric" });
};

/**
 * Adds an item to the sessionStorage.
 *
 * @memberof components.AddSessionStorageItem
 * @param {string} key - The key under which the data will be saved.
 * @param {string} value - The data to save, which will be stringified.
 */
export const AddSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * Adds a user and token to sessionStorage.
 *
 * @memberof components.AddUserToSessionStorage
 * @param {Object} user - The user object to be stored.
 * @param {string} token - The token associated with the user.
 */
export const AddUserToSessionStorage = (user, token) => {
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify({ user, token }));
};

/**
 * Retrieves the user and token from sessionStorage.
 *
 * @memberof components.GetUserToSessionStorage
 * @returns {Object|null} The user and token object if found, or null if not present.
 */
export const GetUserToSessionStorage = () => {
  const item = sessionStorage.getItem(TOKEN_KEY);
  return item ? JSON.parse(item) : null;
};

/**
 * Deletes the user and token from sessionStorage.
 * @memberof components.DeleteUserToSessionStorage
 */
export const DeleteUserToSessionStorage = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

/**
 * Retrieves an item from sessionStorage by key.
 *
 * @memberof components.GetSessionStorageItem
 * @param {string} key - The key of the item to retrieve.
 * @returns {Object|null} The parsed JSON object if found, or null if not present.
 */
export const GetSessionStorageItem = (key) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

/**
 * Deletes an item from sessionStorage by key.
 *
 * @memberof components.RemoveSessionItem
 * @param {string} key - The key of the item to remove.
 */
export const RemoveSessionItem = (key) => {
  sessionStorage.removeItem(key);
};

/**
 * Formats a string or number into a currency format (e.g., "0,00").
 *
 * @memberof components.formatCurrency
 * @param {string|number} [inputValue="0,00"] - The value to format, default is "0,00".
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (inputValue = "0,00") => {
  if (inputValue === "" || inputValue === 0) return "0,00"; // Handle empty input

  if (typeof inputValue !== "string") {
    inputValue = String(inputValue); // Convert to string if necessary
  }

  const parsedValue = parseFloat(inputValue.replace(",", ".")); // Replace commas with dots

  if (isNaN(parsedValue)) {
    return "0.00"; // Return default if not a valid number
  }

  const numericValue = (parsedValue / 100).toFixed(2); // Ensure two decimal places
  const formattedValue = numericValue.replace(".", ","); // Replace dot with comma

  return formattedValue;
};

/**
 * Validates a password based on complexity rules.
 * Requires at least one uppercase letter, one lowercase letter, one digit, and one special character.
 * Minimum length is 8 characters.
 *
 * @memberof components.validatePassword
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password meets the complexity requirements, otherwise false.
 */
export const validatePassword = (password) => {
  const complexityRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return complexityRules.test(password);
};

/**
 * Converts a month name to its corresponding number (01-12).
 *
 * @memberof components.monthToNumber
 * @param {string} monthName - The full month name (e.g., "January").
 * @returns {string} The month number as a two-digit string (e.g., "01").
 */
export function monthToNumber(monthName) {
  const data = parse(monthName, "MMMM", new Date(), { locale: pt });
  return String(format(data, "MM")); // Extracts the month number with two digits
}

/**
 * Converts a month number to its corresponding month name.
 *
 * @memberof components.numberToMonth
 * @param {string} monthNumber - The month number (e.g., "01").
 * @returns {string} The full month name (e.g., "January").
 */
export function numberToMonth(monthNumber) {
  const data = parse(monthNumber, "MM", new Date());
  return format(data, "MMMM", { locale: pt }); // Extracts the full month name
}

export async function hashPassword(password) {
  const saltRounds = parseInt(process.env.SALT_ROUNDS); // Convert SALT_ROUNDS to an integer
  const hashedPassword = await bcrypt.hash(password, saltRounds); // Await the hashed result
  return hashedPassword; // Return the hashed password
}

export const handleHashPassword = async (password) => {
  // const saltRounds = 10; // Adjust the number of salt rounds as needed
  try {
    // Use bcrypt.hash to hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, Number(process.env.REACT_APP_SALT_ROUNDS));
    return hashedPassword;
  } catch (error) {
    logToLocalStorage("Error hashing password:" + error)();
    throw error; // Ensure the error is thrown if hashing fails
  }
};
