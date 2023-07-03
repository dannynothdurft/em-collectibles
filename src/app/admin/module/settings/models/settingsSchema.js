/* 
  Datei: SettingsSchema.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Schema legt die Einstellungen in den Richtiegen Format in die Datenbank
*/

import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  company: {
    type: String,
    maxlength: 50,
  },
  ceo: {
    type: String,
    maxlength: 50,
  },
  taxId: {
    type: String,
    maxlength: 50,
  },
  districtCourt: {
    type: String,
    maxlength: 50,
  },
  districtCourtID: {
    type: String,
    maxlength: 50,
  },
  street: {
    type: String,
    maxlength: 50,
  },
  streetNumber: {
    type: String,
  },
  city: {
    type: String,
    maxlength: 50,
  },
  plz: {
    type: String,
    maxlength: 50,
  },
  country: {
    type: String,
    maxlength: 50,
  },
  warehouseStreet: {
    type: String,
    maxlength: 50,
  },
  warehouseStreetNumber: {
    type: String,
    maxlength: 50,
  },
  warehouseCity: {
    type: String,
    maxlength: 50,
  },
  warehousePlz: {
    type: String,
    maxlength: 50,
  },
  mail: {
    type: String,
    maxlength: 50,
  },
  tel: {
    type: String,
    maxlength: 50,
  },
  host: {
    type: String,
    maxlength: 50,
  },
  hostStreet: {
    type: String,
    maxlength: 50,
  },
  hostCity: {
    type: String,
    maxlength: 50,
  },
  shippingCost: {
    type: String,
    maxlength: 50,
  },
  shippingService: {
    type: String,
    maxlength: 50,
  },
  shippingDays: {
    type: String,
    maxlength: 50,
  },
  returnPeriod: {
    type: String,
    maxlength: 50,
  },
  logo: {
    type: String,
    maxlength: 500,
  },
  billNumber: {
    type: Number,
    maxlength: 4,
  },
  deliveryNumber: {
    type: Number,
    maxlength: 4,
  },
});

export default mongoose.models.settings ||
  mongoose.model("settings", SettingsSchema);
