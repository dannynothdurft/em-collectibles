"use client";
/* 
  Datei: Filter.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementFilter } from "../reducers/allOrders";

function Filter() {
  const dispatch = useDispatch();
  const { orders, filteredOrders } = useSelector((state) => state.allOrders);
  const [filterCharacteristic, setFilterCharacteristic] = useState({
    ordernumber: "",
    customerName: "",
    customerEmail: "",
    status: "",
  });

  const handleFilterChange = ({ currentTarget: input }) => {
    setFilterCharacteristic({
      ...filterCharacteristic,
      [input.name]: input.value,
    });
  };

  const startFilter = () => {
    const filterOrders = orders.filter((order) => {
      return (
        order.billNumber.includes(filterCharacteristic.ordernumber) &&
        order.orderFullName.includes(filterCharacteristic.customerName) &&
        order.orderShipping.email.includes(
          filterCharacteristic.customerEmail
        ) &&
        order.orderStatus.includes(filterCharacteristic.status)
      );
    });
    if (filterOrders.length !== 0 && filterOrders[0] !== undefined) {
      dispatch(incrementFilter(filterOrders));
    } else {
      dispatch(incrementFilter(null));
    }
  };

  return (
    <div className="orderfilter--container">
      <input
        type="text"
        placeholder="Rechnungsnummer"
        value={filterCharacteristic.ordernumber}
        name="ordernumber"
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Kunden Name"
        value={filterCharacteristic.customerName}
        name="customerName"
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Kunden E-Mail"
        value={filterCharacteristic.customerEmail}
        name="customerEmail"
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Status"
        value={filterCharacteristic.status}
        name="status"
        onChange={handleFilterChange}
      />
      <button onClick={startFilter}>Filter Anwenden</button>
    </div>
  );
}

export default Filter;
