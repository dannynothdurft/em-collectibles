/* 
  Datei: articles.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Reducer ist für die Artikel
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const articles = createSlice({
  name: "articles",
  initialState: {
    allArticles: undefined,
  },
  reducers: {
    incrementArticles(state, action) {
      state.allArticles = action.payload;
    },
  },
});

export const { incrementArticles } = articles.actions;

export default articles.reducer;
