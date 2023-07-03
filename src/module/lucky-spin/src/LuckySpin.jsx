/* 
  Datei: LuckySpin.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React, { useState, useEffect } from "react";

// components
import Spin from "./components/Spin";
import Wheel from "./components/Wheel";
import CakePiece from "./components/CakePiece";
import Arrow from "./components/Arrow";
import Button from "./components/Button";
import WinAlert from "./components/WinAlert";
import deutsch from "./utils/language/de.json";

function LuckySpin() {
  const [spin, setSpin] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [deg, setDeg] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const spinTheWheel = () => {
    setSpin(true);
    const randomRotation = Math.floor(Math.random() * 360);
    setDeg(randomRotation);
    setRotation(randomRotation + 3600);
  };

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Spin
      components={
        <>
          <Arrow />
          <Wheel
            rotation={rotation}
            components={
              <>
                <CakePiece bg="#bf1d1d" left="50%" text="Gewinn" />
                <CakePiece
                  bg="#dfd1bb"
                  tf="rotate(36deg)"
                  left={screenWidth <= 769 ? "77px" : "123px"}
                  top={screenWidth <= 769 ? "1px" : "2px"}
                  text="Gewinn"
                />
                <CakePiece
                  bg="#bf1d1d"
                  tf="rotate(72deg)"
                  left={screenWidth <= 769 ? "79px" : "125px"}
                  top={screenWidth <= 769 ? "2px" : "3px"}
                  text="Gewinn"
                />
                <CakePiece
                  bg="#dfd1bb"
                  tf="rotate(108deg)"
                  left={screenWidth <= 769 ? "79px" : "125px"}
                  top={screenWidth <= 769 ? "5px" : "6px"}
                  text="Gewinn"
                />
                <CakePiece
                  bg="#bf1d1d"
                  tf="rotate(144deg)"
                  left={screenWidth <= 769 ? "77px" : "123px"}
                  top={screenWidth <= 769 ? "7px" : "8px"}
                  text="Gewinn"
                />
                <CakePiece
                  bg="#dfd1bb"
                  left={screenWidth <= 769 ? "74.5px" : "120px"}
                  top={screenWidth <= 769 ? "8px" : "8px"}
                  tf="rotate(180deg)"
                  text="Gewinn"
                />
                <CakePiece
                  bg="#bf1d1d"
                  left={screenWidth <= 769 ? "72px" : "117px"}
                  top={screenWidth <= 769 ? "8px" : "8px"}
                  tf="rotate(216deg)"
                  text="Gewinn"
                />
                <CakePiece
                  bg="#dfd1bb"
                  left={screenWidth <= 769 ? "70px" : "115px"}
                  top={screenWidth <= 769 ? "6px" : "6px"}
                  tf="rotate(252deg)"
                  text="Gewinn"
                />
                <CakePiece
                  bg="#bf1d1d"
                  left={screenWidth <= 769 ? "71px" : "115px"}
                  top={screenWidth <= 769 ? "3px" : "3px"}
                  tf="rotate(288deg)"
                  text="Gewinn"
                />
                <CakePiece
                  bg="#dfd1bb"
                  left={screenWidth <= 769 ? "72px" : "117px"}
                  top={screenWidth <= 769 ? "1px" : "1px"}
                  tf="rotate(324deg)"
                  text="Gewinn"
                />
              </>
            }
          />

          {spin ? (
            <WinAlert deg={deg} />
          ) : (
            <Button
              margin={screenWidth <= 769 ? "30px 0 0 0" : " 60px 0 0 0"}
              action={spinTheWheel}
              text={deutsch.playButton}
            />
          )}
        </>
      }
    />
  );
}

export default LuckySpin;
