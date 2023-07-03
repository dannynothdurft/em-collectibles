/* 
  Datei: Input.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Komponente enthält das Input Feld mit Label für den Anmin Bereich.
*/

"use client";
import React from "react";

function Input({ label, value, name, onChange }) {
  return (
    <label>
      {label}
      <input
        type="text"
        placeholder={label}
        value={value}
        name={name}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
