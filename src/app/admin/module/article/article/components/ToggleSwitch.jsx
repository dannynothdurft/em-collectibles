/* 
  Datei: ToggleSwitch.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Komponente behinhalten ein Toogle Switch Button.
*/

import React, { useState, useEffect } from "react";

const ToggleSwitch = ({ onClick, ask, value }) => {
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    if (value === "Ja") {
      setIsToggle(true);
    } else if (value === "Nein") {
      setIsToggle(false);
    }
  }, [value]);

  const toggleButton = () => {
    setIsToggle(!isToggle);
    onClick();
  };

  return (
    <div className="toggle--switch--container">
      <span className="toggle--content">{ask}</span>
      <div className="toggle--switch--button">
        <div
          className="toggle--box"
          style={
            isToggle
              ? { backgroundColor: "#01aca0", transition: "1s ease all" }
              : null
          }
          onClick={toggleButton}
        >
          <div
            className="toggle--circle"
            style={
              isToggle
                ? {
                    left: "15px",
                    boxShadow: "0px 0px 0px 2px #01aca0",
                    transition: "1s ease all",
                  }
                : null
            }
          />
        </div>
        <span className="toggle--value">{isToggle ? "Ja" : "Nein"}</span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
