import React, { useState } from "react";

export const TOKEN_KEY = "token";

export const LAST_ACTIVITY_KEY = "lastActivity";

export const LOCATION = "pt-PT";

export const DEFAULT_AUTO_LOGOUT_TIMEOUT = 300000;

export const DEFAULT_API_URL = "http://localhost:3001/api";

/**
 * Get month name from current location
 * @param {Date} date
 * @returns {String} Month name
 */
export const GetMonthName = (date = new Date()) => {
  return date.toLocaleString(LOCATION, { month: "long" });
};

/**
 * Get year from current location yyyy
 * @returns return the year in format yyyy
 */
export const GetYearName = () => {
  return new Date().toLocaleString(LOCATION, { year: "numeric" });
};

/**
 * Add info to sessionStorage
 * @param {string} key key to save data
 * @param {string} value data to save
 */
export const AddSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const AddUserToSessionStorage = (user, token) => {
  sessionStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ user: user, token: token })
  );
};

export const GetUserToSessionStorage = () => {
  const item = sessionStorage.getItem(TOKEN_KEY);
  return item ? JSON.parse(item) : null;
};

export const DeleteUserToSessionStorage = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

/**
 * Get data from sessionStorage with a key
 * @param {string} key key to get data
 * @returns return the data from teh key
 */
export const GetSessionStorageItem = (key) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

/**
 * Dlete data from sessionStorage
 * @param {string} key key to delete data
 */
export const RemoveSessionItem = (key) => {
  sessionStorage.removeItem(key);
};

export const formatCurrency = (inputValue = "0,00") => {
  // Convert raw value into currency format for display purposes
  if (inputValue === "" || inputValue === 0) return "0,00"; // Handle empty input

  // Ensure inputValue is a string
  if (typeof inputValue !== "string") {
    inputValue = String(inputValue); // Convert to string if necessary
  }

  // Replace commas with dots for parsing
  const parsedValue = parseFloat(inputValue.replace(",", "."));

  // Check if parsedValue is NaN
  if (isNaN(parsedValue)) {
    return "0.00"; // Return default if not a valid number
  }

  // Calculate the numeric value and ensure two decimal places
  const numericValue = (parsedValue / 100).toFixed(2);

  // Replace dot with comma for the final output
  const formattedValue = numericValue.replace(".", ",");

  return formattedValue;
};
