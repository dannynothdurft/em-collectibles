"use client";
/* 
  Datei: allOrders.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { createSlice } from "@reduxjs/toolkit";

export const allOrders = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
    filteredOrders: undefined,
    activeOrder: undefined,
  },
  reducers: {
    incrementOrders(state, action) {
      state.orders = action.payload;
    },
    incrementFilter(state, action) {
      state.filteredOrders = action.payload;
    },
    incrementActiveOrder(state, action) {
      state.activeOrder = action.payload;
    },
  },
});

export const { incrementOrders, incrementFilter, incrementActiveOrder } =
  allOrders.actions;

export default allOrders.reducer;
