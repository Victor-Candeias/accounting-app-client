// src/utils/logger.js
/*
import makeRequest, { HttpMethod } from "./apiClient";
import { DEFAULT_API_URL } from "./utils";

export const logMessage = async (message, level = "info") => {
  try {
    const url = DEFAULT_API_URL + "/logs";

    const response = await makeRequest(HttpMethod.POST, url, {
      message: message,
      level: level,
    });
    console.log("Data posted:", response);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
*/