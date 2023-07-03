/* 
  Datei: settings.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Reducer ist für die Settings
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const settings = createSlice({
  name: "settings",
  initialState: {
    allSettings: [],
  },
  reducers: {
    incrementSettings(state, action) {
      state.allSettings = action.payload;
    },
  },
});

export const { incrementSettings } = settings.actions;

export default settings.reducer;
