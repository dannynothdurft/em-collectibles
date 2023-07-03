/* 
  Datei: Spin.jsx
  Version: 1.0.0
  company: EM
  developer: Danny Nothdurf
*/

import React from "react";
import styled from "styled-components";

const SpinView = styled.div`
  margin: 0;
  padding: 10px 0 0 0;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  width: max-content;
  position: relative;
  width: 400px;
  height: 596px;
  box-sizing: border-box;

  @media screen and (max-width: 769px) {
    width: 250px;
    height: 340px;
  }
`;

function Spin({ components }) {
  return <SpinView>{components}</SpinView>;
}

export default Spin;
