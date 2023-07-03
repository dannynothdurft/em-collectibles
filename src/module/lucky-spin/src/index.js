/* 
  Datei: index.js
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import ReactDOM from "react-dom/client";
import LuckySpin from "./LuckySpin";

const root = ReactDOM.createRoot(document.getElementById("lucky-spin"));
root.render(
  <React.StrictMode>
    <LuckySpin />
  </React.StrictMode>
);
