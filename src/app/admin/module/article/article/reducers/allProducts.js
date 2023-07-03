/* 
  Datei: allProducts.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Reducer ist für die Speicherung aller Produkte um das Verwalten schneller und mit wenigeren Datenbank abfragen zu gestallten
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const allProducts = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    filterProducts: undefined,
  },
  reducers: {
    incrementProducts(state, action) {
      state.products = action.payload;
    },
    addProdukt(state, action) {
      state.products = [...state.products, action.payload];
    },
    decrementProducts(state, action) {
      state.products = action.payload;
    },
    incrementFilter(state, action) {
      state.filterProducts = action.payload;
    },
  },
});

export const {
  incrementProducts,
  addProdukt,
  decrementProducts,
  incrementFilter,
} = allProducts.actions;

export default allProducts.reducer;
