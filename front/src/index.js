import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/global.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from './App';


//routes
import Login from "../src/routes/Login"

ReactDOM.render(
  <React.StrictMode>
    <Router>

      <App/>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

