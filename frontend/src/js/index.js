import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
// import "../sass/style.scss";

if (typeof window !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("credibility"));
}
