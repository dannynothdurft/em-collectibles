/* 
  Datei: articleShema.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Schema legt den Artikel in den Richtiegen Format in die Datenbank
*/

import mongoose from "mongoose";
import { Decimal128 } from "mongodb";

const ArticleSchema = new mongoose.Schema({
  active: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  language: {
    type: String,
    required: true,
    maxlength: 50,
  },
  set: {
    type: String,
    required: true,
    maxlength: 50,
  },
  type: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rarityLevel: {
    type: String,
    required: true,
  },
  gradingScale: {
    type: String,
    maxlength: 50,
  },
  cardNumber: {
    type: String,
    required: true,
    maxlength: 10,
  },
  gradingCompany: {
    type: String,
    maxlength: 50,
  },
  holo: {
    type: String,
    required: true,
  },
  firstEdition: {
    type: String,
    required: true,
  },
  grading: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  certificateNumber: {
    type: String,
  },
  bgc: {
    type: String,
  },
  price: {
    type: Decimal128,
    required: true,
  },
  evaluation: {
    type: Decimal128,
    required: true,
  },
  images: {
    type: Array,
  },
});

export default mongoose.models.article ||
  mongoose.model("article", ArticleSchema);
