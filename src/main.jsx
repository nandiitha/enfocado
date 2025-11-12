
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import  {SessionsProvider}  from "./context/SessionsProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionsProvider>
    <App />
    </SessionsProvider>
  </React.StrictMode>,
);