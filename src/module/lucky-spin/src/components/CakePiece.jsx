/* 
  Datei: CakePiece.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import styled from "styled-components";

const CakeView = styled.div`
  height: 172px;
  width: 112px;
  position: absolute;
  clip-path: polygon(100% 0, 50% 100%, 0 0);
  transform: ${(props) => props.tf};
  transform-origin: bottom;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  font-size: 17px;
  font-weight: bold;
  font-family: sans-serif;
  color: #000;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  background-color: ${(props) => props.bg};
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  p {
    margin: 28px 0 0 0;
  }

  @media screen and (max-width: 769px) {
    height: 105px;
    width: 68px;
    font-size: 10px;
    padding-top: 8px;

    p {
      margin: 10px 0 0 0;
    }

    img {
      width: 23px;
    }
  }
`;

function CakePiece({
  bg = "#ffffff",
  left = "168px",
  top = "none",
  tf = "translateX(-50%)",
  text,
}) {
  return (
    <CakeView bg={bg} left={left} top={top} tf={tf}>
      <p>{text}</p>
    </CakeView>
  );
}

export default CakePiece;
