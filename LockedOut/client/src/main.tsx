import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import your main App component
import './index.css';  // Optionally, import your global CSS file

// Get the root element where React will render the app
const rootElement = document.getElementById('root') as HTMLElement;

// Create the root for React rendering
const root = ReactDOM.createRoot(rootElement);

// Render the app into the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);