/* 
  Datei: Arrow.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import styled from "styled-components";

const Span = styled.div`
  position: absolute;
  top: 5px;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translateX(-50%);
  background-color: #000000;
  clip-path: polygon(50% 50%, 0 0, 100% 0);
  z-index: 9000;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 769px) {
    width: 35px;
    height: 35px;
  }
`;

function Arrow() {
  return <Span></Span>;
}

export default Arrow;
