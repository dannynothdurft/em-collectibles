"use client";
/* 
  Datei: List.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementActiveOrder } from "../reducers/allOrders";

function List() {
  const dispatch = useDispatch();
  const { orders, filteredOrders } = useSelector((state) => state.allOrders);

  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    if (filteredOrders === null) {
      setListOrders([]);
    } else if (filteredOrders !== undefined) {
      if (filteredOrders.length !== 0) {
        setListOrders(filteredOrders);
      }
    } else if (orders.length !== 0) {
      setListOrders(orders);
    } else {
      return;
    }
  }, [orders, filteredOrders]);

  const selectOrder = (order) => {
    dispatch(incrementActiveOrder(order));
  };

  return (
    <div className="orderlist--container">
      <table className="orderlist--table">
        <thead className="orderlist--table--head">
          <tr>
            <th className="th--order-number">Rechnungsnummer</th>
            <th className="th--customer-name">Kunden Name</th>
            <th className="th--customer-email">Kunden E-Mail</th>
            <th className="th--order-status">Status</th>
          </tr>
        </thead>
        <tbody className="orderlist--table--body">
          {[...orders].reverse().map((order, index) => {
            return (
              <tr key={index}>
                <th
                  className="th--order-number"
                  onClick={() => selectOrder(order)}
                >
                  {order.billNumber}
                </th>
                <th className="th--customer-name">{order.orderFullName}</th>
                <th className="th--customer-email">
                  {order.orderShipping.email}
                </th>
                <th className="th--order-status">{order.orderStatus}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {listOrders && listOrders.length <= 0 ? (
        <p className="orderlist--error--text">
          Keiner Egebnisse mit diesem Filter
        </p>
      ) : null}
    </div>
  );
}

export default List;
