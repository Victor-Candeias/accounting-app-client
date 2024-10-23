import React from "react";
import { Navigate } from "react-router-dom";
import { GetSessionStorageItem, TOKEN_KEY } from "./utils";

/**
 * @namespace components
 */

/**
 * @group utils
 */
/**
 * Checks if the user is authenticated by verifying the presence of a token in session storage.
 *
 * @memberof components.PrivateRoute
 * @returns {boolean} True if the user is authenticated, otherwise false.
 */
const isAuthenticated = () => {
  return GetSessionStorageItem(TOKEN_KEY) !== null;
};

/**
 * A private route component that renders its children if the user is authenticated.
 * If the user is not authenticated, it redirects them to the login page.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to render if authenticated.
 * @returns {ReactNode} The children if authenticated, or a redirection to the login page.
 */
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
