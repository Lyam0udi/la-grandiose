// resources/js/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from React 18
import App from './App'; // Ensure the path to App.jsx is correct
//import './index.css'; // Optional: import any global styles

// Get the root element
const rootElement = document.getElementById('app');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create root for React 18
    root.render(<App />);
} else {
    console.error('Root element with id "app" not found.');
}
