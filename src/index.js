import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { swDev } from "./swDev";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

TimeAgo.addDefaultLocale(en);

swDev();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
