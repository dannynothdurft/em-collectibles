/* 
  Datei: store.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Der Store Verwaltet die Ruducer
*/

"use strict";

import { configureStore } from "@reduxjs/toolkit";
import activeArticleReducer from "../module/article/article/reducers/activeArticel";
import allProductsReducer from "../module/article/article/reducers/allProducts";
import allOrdersReducer from "../module/orders/reducers/allOrders";
import settingsReducer from "../module/settings/reducers/settings";

export const store = configureStore({
  reducer: {
    activeArticle: activeArticleReducer,
    allProducts: allProductsReducer,
    allOrders: allOrdersReducer,
    settings: settingsReducer,
  },
});
