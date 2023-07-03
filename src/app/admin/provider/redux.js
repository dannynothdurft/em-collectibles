/* 
  Datei: providers.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Provider inizialisiert die Ruduzer
*/

"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

export function Redux({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
