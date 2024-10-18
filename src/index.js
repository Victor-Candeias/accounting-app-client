/**
 * index.js
 * 
 * The main entry point for the React application. This file imports the necessary 
 * modules, styles, and the main App component, then renders the App into the 
 * root element of the HTML document.
 */

// Import the necessary modules from React and ReactDOM
import React from 'react'; // Importing the React library to create React components
import ReactDOM from 'react-dom/client'; // Importing ReactDOM to manage DOM rendering
import './index.css'; // Importing global styles for the application
import App from './App'; // Importing the main App component

// Get the root element from the HTML where the React app will be mounted
const entryPoint = document.getElementById("root");

// Render the App component into the root element
ReactDOM.createRoot(entryPoint).render(<App />);
