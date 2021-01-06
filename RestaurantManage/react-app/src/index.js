import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//import React from "react";
//import ReactDOM from "react-dom";
//import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.css";
// import "@fortawesome/fontawesome-free/css/all.css";
// import $ from "jquery";
// import Popper from "popper.js";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );
// reportWebVitals();
