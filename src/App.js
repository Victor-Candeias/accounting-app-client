import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import AccountingApp from "./components/AccountingApp";
import "./App.css";
import PrivateRoute from "./components/utils/PrivateRoute";
import AutoLogout from "./components/utils/AutoLogout";
import { DEFAULT_AUTO_LOGOUT_TIMEOUT } from "./components/utils/utils";


function App() {
  return (
    <Router>
      <AutoLogout timeout={DEFAULT_AUTO_LOGOUT_TIMEOUT} />{" "}
      {/* 5 minutes timeout */}
      <div className="container">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private route wrapping the protected component */}
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
