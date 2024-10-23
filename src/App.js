import React from "react";
// Importing React Router components for routing
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Importing components for registration, login, and main accounting app
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import AccountingApp from "./components/AccountingApp";

// Importing global styles
import classes from "./App.module.css";

// Importing utility components for route protection and automatic logout
import PrivateRoute from "./components/utils/PrivateRoute";
import AutoLogout from "./components/utils/AutoLogout";
import { DEFAULT_AUTO_LOGOUT_TIMEOUT } from "./components/utils/utils";

/**
 * @module App
 */
/**
 * The main App component that sets up the router and routes for the application.
 *
 * This component wraps the application in a Router and defines the routes available,
 * including the login, registration, and a private route for the accounting application.
 * It also includes an automatic logout functionality that triggers after a specified timeout.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <Router>
      {/* Automatic logout component with a timeout of 5 minutes */}
      <AutoLogout timeout={DEFAULT_AUTO_LOGOUT_TIMEOUT} />
      <div className={classes.container}>
        <Routes>
          {/* Redirect root path to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private route for accessing the AccountingApp component */}
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <AccountingApp />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
