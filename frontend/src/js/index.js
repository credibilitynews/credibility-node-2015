import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
// import "../sass/style.scss";

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(<App />, document.getElementById("credibility"));
  });
}
