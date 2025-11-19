import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
try {
  console.log("Attempting to mount React app...");
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("React app mounted successfully");
} catch (error) {
  console.error("Failed to mount React app:", error);
  rootElement.innerHTML = `<div style="color: red; padding: 20px;"><h1>Runtime Error</h1><pre>${error}</pre></div>`;
}