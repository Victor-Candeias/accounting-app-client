// apiHelper.js
import axios from "axios";
import { TOKEN_KEY, GetSessionStorageItem } from "./utils";

// Define a simple enum-like object for HTTP methods
export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

// Utility function for handling axios requests
export default async function makeRequest(
  method,
  url,
  data = null,
  params = null
) {
  // Check if the method is a valid enum value
  if (!Object.values(HttpMethod).includes(method)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  console.log("method=" + method);
  console.log("url=" + url);
  console.log("data=" + data);
  console.log("params=" + params);

  // Set up the headers, including the Authorization token if provided
  const token = GetSessionStorageItem(TOKEN_KEY);

  const headers = token
    ? { Authorization: `Bearer ${token.token}` } // Add Bearer token to headers
    : {};

  try {
    const response = await axios({
      method: method,
      url: url,
      data: method === HttpMethod.POST ? data : null, // Only include data for POST requests
      headers: headers, // Include headers in the request
      params: params, // Include query parameters for GET requests
    });
    return response.data;
  } catch (error) {
    const msg = `Error making ${method.toUpperCase()} request to ${url}:`;

    console.error(msg, error);

    if (error.status === 404) {
      return [];
    } else {
      throw error;
    }
  }
}
