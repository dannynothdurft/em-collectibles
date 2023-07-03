/* 
  Datei: danke/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import "@/styles/danke.scss";
import React from "react";
import Link from "next/link";

function page() {
  return (
    <div className="thanks--container">
      <h2>Vielen Dank für Deine Bestellung</h2>
      <p>
        Deine Bestellung ist eingegangen und wird bald zur Bearbeitung
        freigegeben.
      </p>
      <p>An Deine E-Mail-Adresse wurde eine Bestätigungs Mail gesendet.</p>

      <Link href="/">Zurück zur Startseite</Link>
    </div>
  );
}

export default page;
