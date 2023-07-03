/* 
  Datei: Button.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import React from "react";

function Button({ onClick, content, inaktiv }) {
  return (
    <div className="product--adtobasket--button">
      <button className="btn" onClick={onClick}>
        {content}
        <span />
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export default Button;
