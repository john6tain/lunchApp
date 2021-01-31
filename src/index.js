import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Admin from './Admin';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter,  } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter  >
    <div>
      <Route Route exact path="/">
        <App />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
    </div>
  </BrowserRouter >,
  document.getElementById('root')


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
