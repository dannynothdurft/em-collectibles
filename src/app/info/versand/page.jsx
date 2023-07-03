/* 
  Datei: /wiederrufsbelerung/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält den Versand der Shop-Anwendung.
*/

"use client";
import { useSelector } from "react-redux";

function Shipping() {
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <div className="versand--container">
      <h1>Versand</h1>
      <h2>Versand Deutschland</h2>

      <p>
        Alle Lieferungen innerhalb Deutschlands schicken wir dir{" "}
        <span>{allSettings.shippingCost}</span> und deine Karten sind in der
        Regel innerhalb von <span>{allSettings.shippingDays}</span> bei dir.
      </p>

      <h2>Versand EU</h2>

      <p>
        Lieferungen innerhalb der EU schicken wir dir ebenfalls{" "}
        <span>{allSettings.shippingCost}</span> per Deutsche Post Brief
        International.
      </p>

      <h2>Kostenlose Rücksendung</h2>
      <p>
        Solltest du mit deiner Bestellung nicht zufrieden sein oder hast du es
        dir anders überlegt, dann kannst du sie
        <span>
          innerhalb von {allSettings.returnPeriod} kostenlos an uns zurück
          senden
        </span>
        .
      </p>
      <p>
        Schreib uns einfach eine kurze Email und wir schicken dir innerhalb
        eines Werktages ein entsprechendes Rücksendeetikett zu.
      </p>
    </div>
  );
}

export default Shipping;
