/* 
  Datei: activeArticle.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Reducer ist für den Aktuellen Artikel um ihn zu bearbeiten oder anzulegen
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const activeArticle = createSlice({
  name: "activeArticle",
  initialState: {
    data: undefined,
  },
  reducers: {
    incrementData(state, action) {
      state.data = action.payload;
    },
    decrementData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { incrementData, decrementData } = activeArticle.actions;

export default activeArticle.reducer;
