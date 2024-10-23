/**
 * Entry point of the React application.
 * This file is responsible for rendering the main App component into the DOM and initializing performance tracking.
 */

// Import React library for creating components
import React from 'react';

// Import ReactDOM for rendering components into the DOM
import ReactDOM from 'react-dom/client';

// Import global styles for the application
import './index.css';

// Import the main App component, which will be rendered into the root DOM node
import App from './App';

// Import the reportWebVitals function, used for measuring app performance
import reportWebVitals from './reportWebVitals';

/**
 * Root DOM node where the React application is rendered.
 * @type {HTMLElement} 
 */
const rootElement = document.getElementById('root');

/**
 * Initialize the React application and render the App component inside the root DOM element.
 * The App component is wrapped in React.StrictMode for highlighting potential issues in the app.
 * 
 * @param {HTMLElement} rootElement - The root DOM element where the React app is injected.
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Measure performance of the app.
 * Pass a function to log performance metrics or send them to an analytics endpoint.
 * 
 * @example
 * reportWebVitals(console.log);
 * 
 * @param {function} [onPerfEntry] - Function to handle performance metrics (e.g., console.log or analytics function).
 */
reportWebVitals();
