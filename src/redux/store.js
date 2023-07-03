/* 
  Datei: store.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Der Store Verwaltet die Ruducer
*/

"use strict";

import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "./reducer/settings";
import articlesReducer from "./reducer/articles";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    articles: articlesReducer,
  },
});
