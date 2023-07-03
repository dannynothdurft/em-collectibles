/* 
  Datei: LuckySpin.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const View = styled.div`
  margin-top: 15px;
`;

const TextView = styled.div`
  width: 300px;
  font-family: sans-serif;

  h2 {
    margin-top: 0;
    font-size: 16px;
    text-align: center;
    margin: 0 0 5px 0;
  }

  h3 {
    font-size: 15px;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: normal;
  }

  .code {
    font-weight: bold;
    color: rgb(227, 146, 164);
  }

  p {
    font-size: 10px;
    margin: 10px 0;
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .fade-in {
    animation: fadeIn 1s ease-in;
  }

  .fade-out {
    animation: fadeOut 1s ease-out;
  }

  @media screen and (max-width: 769px) {
    width: 200px;
    position: absolute;
    bottom: 50px;
    right: calc(50% - 100px);
    background-color: #fff;
    padding: 8px;
    border-radius: 8px;
    z-index: 9999;
    animation: fadeIn 1s ease-in;
    h2 {
      font-size: 14px;
      font-weight: bold !important;
    }

    h3 {
      font-size: 13px;
    }
  }
`;

const Link = styled.a`
  margin: 0 auto !important;
  display: block;
  width: 110px;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: rgb(255, 255, 255);
  background-color: rgb(77, 75, 80);
  border: 1px solid #4b4b50;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none !important;
  font-family: sans-serif;
  box-sizing: border-box;
`;

const Text = styled.p`
  font-family: sans-serif;
  margin-top: 60px;
  text-align: center;

  @media screen and (max-width: 769px) {
    margin-top: 30px;
  }
`;

function WinAlert({ deg }) {
  const [win, setWin] = useState(false);
  const [value, setValue] = useState("");
  const [gutschein, setGutschein] = useState("");

  useEffect(() => {
    getValue(deg, setGutschein);
    const timeout = setTimeout(() => {
      setWin(true);
    }, 5200);

    return () => {
      clearTimeout(timeout);
    };
  }, [deg]);

  const getValue = (deg, setGutschein) => {
    switch (true) {
      case deg >= 0 && deg < 18:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      case deg >= 18 && deg < 54:
        setGutschein("Gutschein Code");
        setValue("15%");
        break;
      case deg >= 54 && deg < 90:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      case deg >= 90 && deg < 126:
        setGutschein("Gutschein Code");
        setValue("15%");
        break;
      case deg >= 126 && deg < 162:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      case deg >= 162 && deg < 198:
        setGutschein("Gutschein Code");
        setValue("15%");
        break;
      case deg >= 198 && deg < 234:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      case deg >= 234 && deg < 270:
        setGutschein("Gutschein Code");
        setValue("15%");
        break;
      case deg >= 270 && deg < 306:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      case deg >= 306 && deg < 342:
        setGutschein("Gutschein Code");
        setValue("15%");
        break;
      case deg >= 342 && deg < 360:
        setGutschein("Gutschein Code");
        setValue("20%");
        break;
      default:
        return "You Lose";
    }
  };

  return (
    <View>
      {win ? (
        <TextView>
          <h2>Herzlichen Glückwunsch!</h2>
          <h3>Du hast einen {value}-Gutschein gewonnen:</h3>
          <h3 className="code">{gutschein}*</h3>
          <p>*Gültig bis zum 31.07.2023 auf alles im Shop.</p>
          <Link href={`https://www.beispiel.de/shop/?vcode=${gutschein}`}>
            ZUM SHOP
          </Link>
          <p>
            Bei Klick auf diesen Button wird Dein Gutscheincode automatisch im
            Warenkorb für Dich gespeichert.
          </p>
        </TextView>
      ) : (
        <Text>Trommelwirbel! Wir drücken die Daumen für den Hauptgewinn!</Text>
      )}
    </View>
  );
}

export default WinAlert;
