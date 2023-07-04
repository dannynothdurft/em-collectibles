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
      company: "EM-Collectibles UG",
      ceo: "Danny Nothdurft",
      taxId: "DE281439589",
      districtCourt: "Amtsgericht Lüneburg",
      districtCourtID: "HRB 203605",
      street: "Tribünenweg",
      streetNumber: "32",
      city: "Hamburg",
      plz: "22111",
      country: "Deutschland",
      warehouseStreet: "Tribünenweg",
      warehouseStreetNumber: "32",
      warehouseCity: "Hamburg",
      warehousePlz: "22111",
      mail: "danny.nothdurft@gmail.com",
      tel: "017656612113",
      host: "Vercel Inc.",
      hostStreet: "440 N Barranca Ave #4133",
      hostCity: "Covina, CA 91723",
      shippingCost: "Versandkostenfrei",
      shippingService: "DHL",
      shippingDays: "2-3 Tage",
      returnPeriod: "14 Tage",
      logo: "https://res.cloudinary.com/dca67w0ia/image/upload/v1686323245/settings/6483341f5bea6ec363d58e24.png",
      bank: "Norisbank",
      iban: "DE45 6486 1687 4156 54",
      bic: "NORISDED",
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
