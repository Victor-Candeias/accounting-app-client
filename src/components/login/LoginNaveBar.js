// Navbar.js
import React from "react";
import "./LoginNaveBar.css";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const LoginNaveBar = ({ caption, link }) => {
  return (
    <nav className="boby-navebar p-4">
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
