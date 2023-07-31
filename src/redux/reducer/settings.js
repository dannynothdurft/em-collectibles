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
    allSettings: {
      company: "EM-Collectibles",
      ceo: "Max Musterman",
      taxId: "DE123456789",
      districtCourt: "Amtsgericht Hamburg",
      districtCourtID: "HRB 123456",
      street: "Musterstraße",
      streetNumber: "1",
      city: "Musterstadt",
      plz: "12345",
      country: "Deutschland",
      warehouseStreet: "Musterstraße",
      warehouseStreetNumber: "1",
      warehouseCity: "Musterstadt",
      warehousePlz: "12345",
      mail: "max.musterman@gmail.com",
      tel: "0176 123456789",
      host: "Vercel Inc.",
      hostStreet: "440 N Barranca Ave #4133",
      hostCity: "Covina, CA 91723",
      shippingCost: "Versandkostenfrei",
      shippingService: "DHL",
      shippingDays: "2-3 Tage",
      returnPeriod: "14 Tage",
      logo: "https://res.cloudinary.com/dca67w0ia/image/upload/v1686323245/settings/6483341f5bea6ec363d58e24.png",
      bank: "Musterbank",
      iban: "DE12 1234 1234 1234 00",
      bic: "MUSTERBIC",
    },
  },
  reducers: {
    incrementSettings(state, action) {
      state.allSettings = action.payload;
    },
  },
});

export const { incrementSettings } = settings.actions;

export default settings.reducer;
