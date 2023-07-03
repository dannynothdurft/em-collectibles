/* 
  Datei: Button.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import styled from "styled-components";

const View = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  font-family: sans-serif;

  :hover {
    background-color: ${(props) => props.bcHover};
    box-shadow: ${(props) => props.bsHover};
  }

  :active {
    box-shadow: ${(props) => props.bsActive};
  }
`;

const IconView = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: ${(props) => props.iconMr};
  padding: 0;
  font-size: ${(props) => props.iconFS};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Button({
  margin = "0 0 0 0",
  padding = "0 0 0 0",
  width = "175px",
  height = "35px",
  fontSize = "18px",
  color = "rgb(255, 255, 255)",
  backgroundColor = "rgb(77, 75, 80)",
  border = "1px solid #4b4b50",
  borderRadius = "2px",
  text = "Button",
  action,
  bcHover = "rgb(153, 153, 153)",
  bsHover = "2px 2px 2px rgb(77, 75, 80)",
  bsActive = "inset 2px 2px 2px rgb(77, 75, 80)",
  icon,
  iconMr = "10px",
  iconFS = "15px",
}) {
  const clickButton = () => {
    action();
  };

  return (
    <View
      onClick={clickButton}
      margin={margin}
      padding={padding}
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      bcHover={bcHover}
      bsHover={bsHover}
      bsActive={bsActive}
    >
      {icon && icon ? (
        <IconView iconMr={iconMr} iconFS={iconFS}>
          {icon}
        </IconView>
      ) : null}
      {text}
    </View>
  );
}

export default Button;
