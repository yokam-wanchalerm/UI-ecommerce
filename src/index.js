import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonProvider } from "./context/CommonProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/react-loading-skeleton/dist/skeleton.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommonProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CommonProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
