/* 
  Datei: /wiederrufsbelerung/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält die Wiederrufsbelerung der Shop-Anwendung.
*/

"use client";
import { useSelector } from "react-redux";

function Wiederrufsbelerung() {
  const { allSettings } = useSelector((state) => state.settings);
  return (
    <div className="wiederrufsbelerung--container">
      <h1>Widerrufsrecht</h1>
      <h2>Kostenlose Rücksendung</h2>
      <p>
        Solltest du mit deiner Bestellung nicht zufrieden sein oder hast du es
        dir anders überlegt dann kannst du sie{" "}
        <span>
          innerhalb von {allSettings.returnPeriod} kostenlos an uns zurück
          senden.
        </span>
      </p>
      <p>
        Schreib uns einfach eine kurze Email und wir schicken dir innerhalb
        eines Werktages ein entsprechendes Rücksendeetikett zu.
      </p>
      <h2>Widerrufsbelehrung entsprechend EU-Verbraucherrechterichtlinie</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
        ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht
        Beförderer ist, die Waren in Besitz genommen haben bzw. hat. Um Ihr
        Widerrufsrecht auszuüben, müssen Sie uns:
      </p>
      <p className="wiederrufsbelerung--text--bold--center">
        {allSettings.company} <br /> {allSettings.ceo} <br />
        {allSettings.street} {allSettings.streeNumber}
        <br />
        {allSettings.plz} {allSettings.city}
        <br />
        E-Mail: {allSettings.email}
      </p>
      <p>
        mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter
        Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu
        widerrufen, informieren. Sie können dafür das beigefügte
        Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>

      <p className="wiederrufsbelerung--text--container">
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
        wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
        andere Art der Lieferung als die von uns angebotene, günstigste
        Standardlieferung gewählt haben), unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
        Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
        ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
        wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen
        wegen dieser Rückzahlung Entgelte berechnet.
      </p>
      <p className="wiederrufsbelerung--text--container">
        Wir können die Rückzahlung verweigern, bis wir die Waren wieder
        zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie
        die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt
        ist. Sie haben die Waren unverzüglich und in jedem Fall spätestens
        binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf
        dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben.
        Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von
        vierzehn Tagen absenden. Wir tragen die unmittelbaren Kosten der
        Rücksendung der Waren falls das von uns per Email bereitgestellt
        Rücksendeetikett verwendet wird. Sendet der Käufer die Ware nicht mit
        dem von uns erstellten Rücksendeetikett zurück, behalten wir uns das
        Recht vor die Kosten des Rückversandes nicht zu übernehmen.
      </p>
      <p className="wiederrufsbelerung--text--container">
        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn
        dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
        Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit
        ihnen zurückzuführen ist.
      </p>
    </div>
  );
}

export default Wiederrufsbelerung;
