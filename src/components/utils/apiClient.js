// apiHelper.js
import axios from "axios";
import { TOKEN_KEY, GetSessionStorageItem } from "./utils";

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * @memberof components.apiClient
 * @enum {string}
 * Enum-like object for HTTP methods.
 */
export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

/**
 * Utility function for handling axios requests.
 *
 * @memberof components.makeRequest
 * @param {string} method - The HTTP method to use for the request. Must be one of 
 *                          the values defined in HttpMethod.
 * @param {string} url - The URL to which the request is sent.
 * @param {Object|null} [data=null] - The data to be sent as the request body, 
 *                                     applicable for POST requests. Default is null.
 * @param {Object|null} [params=null] - The query parameters to be sent with the 
 *                                       request, applicable for GET requests. Default is null.
 * @returns {Promise<Object>} The response data from the request.
 * @throws {Error} Throws an error if the HTTP method is invalid or if the request fails.
 */
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
