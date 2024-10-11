import React from "react";
import { Navigate } from "react-router-dom";
import { GetSessionStorageItem, TOKEN_KEY } from "./utils";

// Function to check if a user is authenticated
const isAuthenticated = () => {
  return GetSessionStorageItem(TOKEN_KEY) !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
