// Import necessary dependencies
import React from 'react';                          // Import the core React library
import ReactDOM from 'react-dom/client';            // Import ReactDOM for rendering to the DOM using the new Root API
import './index.css';                               // Import global styles
import App from './App';                            // Import the main App component

// Create a root for React to render into
// getElementById('root') finds the <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root
root.render(
  // StrictMode is a development tool that highlights potential problems
  <React.StrictMode>
    <App />                                       
  </React.StrictMode>
);