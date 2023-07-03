/* 
  Datei: Wheel.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import styled from "styled-components";

function Wheel({ components, rotation }) {
  return (
    <Container
      className="container"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {components}
    </Container>
  );
}

const Container = styled.div`
  width: 360px;
  height: 360px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 4px solid #ffffff;
  position: relative;
  overflow: hidden;
  transition: 5s;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  @media screen and (max-width: 769px) {
    width: 225px;
    height: 225px;
  }
`;

export default Wheel;
