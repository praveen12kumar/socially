import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeServer } from './server';
import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";
import { DataContext, DataProvider } from './context/DataContext';
makeServer()
export {AuthContext};
export {DataContext};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <DataProvider>
      <AuthProvider> 
          <App />
      </AuthProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>
);

