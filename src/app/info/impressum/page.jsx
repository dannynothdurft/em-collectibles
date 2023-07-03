/* 
  Datei: /impressum/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält den Impressum der Shop-Anwendung.
*/

"use client";
import { useSelector } from "react-redux";

function Impressum() {
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <div className="impressum--container">
      <h1>Impressum</h1>
      <div className="impressum--view">
        <div className="impressum--view">
          <p>{allSettings.company}</p>
          <p>
            {allSettings.street} {allSettings.streeNumber}
          </p>
          <p>
            {allSettings.plz} {allSettings.city}
          </p>
          <p>E-Mail: {allSettings.email}</p>
          <p>Telefon: {allSettings.tel}</p>
        </div>
        <div className="impressum--view">
          <p className="text--bold">
            Für Retouren verwende bitte folgende Daten:
          </p>
          <p>{allSettings.company}</p>
          <p>
            {allSettings.street} {allSettings.streeNumber}
          </p>
          <p>
            {allSettings.plz} {allSettings.city}
          </p>
        </div>
        <div className="impressum--view">
          <p>Geschäftsführung: {allSettings.ceo}</p>
          <p>
            Eingetragen beim Amtsgericht {allSettings.districtCourt} unter{" "}
            {allSettings.districtCourtID}
          </p>
          <p>Umsatzsteuer-ID: {allSettings.taxId}</p>
        </div>
      </div>
    </div>
  );
}

export default Impressum;
