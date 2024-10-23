import React from "react";
import classes from "./LoginNaveBar.module.css";
import { Link } from "react-router-dom"; // Assuming React Router is used for navigation

/**
 * @module components.login.LoginNaveBar
 */
/**
 * Navigation bar component for login and registration pages.
 *
 * The navigation bar includes a dynamic class that changes based on the current server environment
 * (either Python or Node.js) and displays a link with a caption.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.caption - The text to display for the navigation link (e.g., "Register", "Login").
 * @param {string} props.link - The URL path for the navigation link.
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const LoginNaveBar = ({ caption, link }) => {
  return (
    <nav
      className={`${
        process.env.REACT_APP_CURRENT_SERVER === "python"
          ? classes["boby-navebar-python"]
          : classes["boby-navebar-nodejs"]
      } p-4`}
    >
      <div className="max-w-md mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Aplicação Financeira</h1>
        <Link to={link} className="text-white text-xl hover:underline">
          {caption}
        </Link>
      </div>
    </nav>
  );
};

export default LoginNaveBar;
