/* 
  Datei: Select.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Komponente behinhalten die Select Option Funktion für die Verwaltung in dem ArticleForm
*/

"use client";
import React, { useState, useEffect } from "react";

function Select({ object, setObject, ask, value, options, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(`.close--window--${ask}`)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ask]);

  const handleOptionClick = (value, bgc) => {
    if (ask === "type") {
      setObject({
        ...object,
        [ask]: value,
        ["bgc"]: bgc,
      });
    } else {
      setObject({
        ...object,
        [ask]: value,
      });
    }
    setIsOpen(false);
  };

  return (
    <div className={`custom--select close--window--${ask}`}>
      {label}
      <input
        type="text"
        readOnly
        name={ask}
        placeholder={options[0].label}
        value={value}
        onClick={toggleDropdown}
      />
      <ul
        className={`close--window--${ask}`}
        style={isOpen ? { display: "block" } : null}
      >
        {options.map((option) => (
          <li
            key={option.value}
            data-value={option.value}
            onClick={() => handleOptionClick(option.value, option.bgc)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
