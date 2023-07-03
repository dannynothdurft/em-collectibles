"use client";
/* 
  Datei: orders/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import "./styles/orders.scss";
import React from "react";
import Advertisement from "./components/Advertisement";
import Filter from "./components/Filter";
import List from "./components/List";
import OneOrder from "./components/OneOrder";

function page() {
  return (
    <div className="orders--daschboard--container">
      <Advertisement />
      <Filter />
      <List />
      <OneOrder />
    </div>
  );
}

export default page;
