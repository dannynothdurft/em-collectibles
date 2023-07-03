/* 
  Datei: /agb/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält die Wiederrufsbelerung der Shop-Anwendung.
*/

"use client";
import Link from "next/link"; // Import der Link-Komponente aus Next.js
import { useSelector } from "react-redux";

function AGB() {
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <div className="agb--container">
      <h1>Allgemeine Geschäftsbedingungen</h1>
      <p className="agb--text--container">
        Im folgenden möchten wir Dir unsere Allgemeinen Geschäftsbedingungen
        vorstellen. Hier findest Du wichtige Informationen über das Einkaufen
        bei SugarShape.
      </p>
      <div>
        <h2>1. Geltungsbereich</h2>
        <p>
          Für alle Bestellungen über unseren Online-Shop gelten die
          nachfolgenden AGB.
        </p>
        <h2>2. Vertragspartner, Vertragsschluss</h2>
        <p>Der Kaufvertrag kommt zustande mit der {allSettings.company}</p>
        <p>
          Mit Einstellung der Produkte in den Online-Shop geben wir ein
          verbindliches Angebot zum Vertragsschluss über diese Artikel ab. Du
          kannst unsere Produkte zunächst unverbindlich in den Warenkorb legen
          und Deine Eingaben vor Absenden Deiner verbindlichen Bestellung
          jederzeit korrigieren, indem Du die hierfür im Bestellablauf
          vorgesehenen und erläuterten Korrekturhilfen nutzt. Der Vertrag kommt
          zustande, indem Du durch Anklicken des Bestellbuttons das Angebot über
          die im Warenkorb enthaltenen Waren annimmst. Unmittelbar nach dem
          Absenden der Bestellung erhältst Du noch einmal eine Bestätigung per
          E-Mail.
        </p>
        <h2>3. Vertragssprache, Vertragstextspeicherung</h2>
        <p>
          Die für den Vertragsschluss zur Verfügung stehende Sprache ist
          Deutsch.
          <br />
          Wir speichern den Vertragstext und senden Dir die Bestelldaten und
          unsere AGB per E-Mail zu. Die AGB kannst Du jederzeit auch hier auf
          dieser Seite einsehen. Deine vergangenen Bestellungen kannst Du in
          unserem Kunden-Login einsehen.
        </p>
        <h2>4. Widerrufsbelehrung</h2>
        <h3>Widerrufsrecht</h3>
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
          ab dem Tag, an dem Du oder ein von Dir benannter Dritter, der nicht
          der Beförderer ist, die Waren in Besitz genommen hat bzw. hast. <br />
          Um Dein Widerrufsrecht auszuüben, musst Du uns ({allSettings.company},
          {allSettings.street} {allSettings.streetNumber}, {allSettings.plz}{" "}
          {allSettings.city},{" "}
          <Link href={`mailto:${allSettings.email}`} rel="nofollow">
            {allSettings.email}
          </Link>
          , Telefon:{" "}
          <Link href={`tel:${allSettings.tel}`} rel="nofollow">
            {allSettings.tel}
          </Link>
          ) (<strong>Für Retouren verwende bitte folgende Daten:</strong>
          {allSettings.street} {allSettings.streetNumber}, {allSettings.plz}{" "}
          {allSettings.city}) mittels einer eindeutigen Erklärung (z. B. ein mit
          der Post versandter Brief, Telefax oder E-Mail) über Deinen
          Entschluss, diesen Vertrag zu widerrufen, informieren. Du kannst dafür
          das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
          vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass
          Du die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
          Widerrufsfrist absendest.
        </p>
        <h3>Folgen des Widerrufs</h3>
        <p>
          Wenn Du diesen Vertrag widerrufst, haben wir Dir alle Zahlungen, die
          wir von Dir erhalten haben, einschließlich der Lieferkosten (mit
          Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Du
          eine andere Art der Lieferung als die von uns angebotene, günstigste
          Standardlieferung gewählt hast), unverzüglich und spätestens binnen
          vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
          Deinen Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
          Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Du bei der
          ursprünglichen Transaktion eingesetzt hast, es sei denn, mit Dir wurde
          ausdrücklich etwas anderes vereinbart; in keinem Fall werden Dir wegen
          dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung
          verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Du
          den Nachweis erbracht hast, dass Du die Waren zurückgesandt hast, je
          nachdem, welches der frühere Zeitpunkt ist. Du hast die Waren
          unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem
          Tag, an dem Du uns über den Widerruf dieses Vertrags unterrichtet
          hast, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt,
          wenn Du die Waren vor Ablauf der Frist von vierzehn Tagen absendest.
          Du musst für einen etwaigen Wertverlust der Waren nur aufkommen, wenn
          dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
          Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang
          mit Dir zurückzuführen ist.
        </p>
        <h3>Muster-Widerrufsformular</h3>
        <p>
          Wenn Du den Vertrag widerrufen willst, dann fülle bitte das{" "}
          <a
            href="/out/media/MusterWiderrufsformular.pdf"
            target="_blank"
            className="btn-text"
          >
            Widerrufsformular (PDF-Datei)
          </a>{" "}
          aus und sende es an die {allSettings.company},{allSettings.street}{" "}
          {allSettings.streetNumber}, {allSettings.plz} {allSettings.city},{" "}
          {allSettings.country}
          <br />
          E-Mail:{" "}
          <Link href={`mailto:${allSettings.email}`} rel="nofollow">
            {allSettings.email}
          </Link>
        </p>
        Ende der Widerrufsbelehrung
        <h2>5. Lieferbedingungen</h2>
        <h3>Versandkosten je Bestellung</h3>
        <strong></strong>
        <p>
          Lieferungen innerhalb Deutschlands und Österreich sind
          {allSettings.shippingCost}.
        </p>
        <p>
          Für Lieferungen in folgende Länder berechnen wir Versandkosten in Höhe
          von 4,95 € pro Bestellung: Belgien, Niederlande, Lettland, Litauen,
          Luxemburg, Estland, Finnland, Frankreich,Griechenland, Republik
          Irland, Italien, Portugal, Slowakei, Slowenien, Spanien, Zypern.
          <br />
          Lieferungen ab einem Rechnungsbetrag von 150 € sind in diesen Ländern
          {allSettings.shippingCost}.
        </p>
        <p>
          Wir liefern nur im Versandweg. Eine Selbstabholung der Ware ist leider
          nicht möglich.
        </p>
        <h2>6. Retouren und Umtäusche</h2>
        <p>
          Du kannst gekaufte Artikel innerhalb von {allSettings.returnPeriod}{" "}
          umtauschen oder zurückgeben, wenn er Dir nicht passen oder gefallen
          sollte. Für die genaue Vorgehensweise besuche bitte unsere{" "}
          <Link href="/info/versand" target="_blank">
            Hinweisseite zu Retouren
          </Link>
          .
        </p>
        <p>
          Die Versandkosten für Retouren aus Deutschland und Österreich
          übernehmen wir.
          <br />
          Für Rücksendungen aus dem restlichen Ausland musst Du die Kosten der
          Sendung leider selbst tragen - Umtäusche sind aus dem Ausland leider
          nicht möglich.
        </p>
        <p>
          Solltest Du Dein Paket aus dem Ausland oder ohne Retourenlabel
          zurückschicken wollen, sende es bitte frankiert an folgende Adresse:
        </p>
        <p className="agb--text--bold--center">
          {allSettings.company}
          <br />
          {allSettings.ceo}
          <br />
          {allSettings.street} {allSettings.streeNumber}
          <br />
          {allSettings.plz} {allSettings.city}
          <br />
          {allSettings.country}
        </p>
        <p>
          <strong>
            Bitte beachte, dass wir benutzte, gewaschene, beschädigte oder
            verschmutzte Ware nicht zurücknehmen können. Gleiches gilt für
            Artikel, an denen das Papier- oder Textil-Etikett fehlt.
          </strong>
        </p>
        <h2> 7. Bezahlung</h2>
        <p>
          In unserem Shop stehen Dir grundsätzlich die folgenden Zahlungsarten
          zur Verfügung:
        </p>
        <strong>Vorkasse</strong>
        <p>
          Bei Auswahl der Zahlungsart Vorkasse nennen wir Dir unsere
          Bankverbindung in separater E-Mail und liefern die Ware nach
          Zahlungseingang.
        </p>
        <strong>PayPal</strong>
        <p>
          Im Bestellprozess wirst Du auf die Webseite des Online-Anbieters
          PayPal weitergeleitet. Um den Rechnungsbetrag über PayPal bezahlen zu
          können, musst Du dort registriert sein bzw. Dich erst registrieren,
          mit Deinen Zugangsdaten legitimieren und die Zahlungsanweisung an uns
          bestätigen. Nach Abgabe der Bestellung im Shop fordern wir PayPal zur
          Einleitung der Zahlungstransaktion auf. Die Zahlungstransaktion wird
          durch PayPal unmittelbar danach automatisch durchgeführt. Weitere
          Hinweise erhältst Du beim Bestellvorgang.
        </p>
        <h2>8. Eigentumsvorbehalt</h2>
        <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
        <h2>9. Transportschäden</h2>
        <p>
          Werden Waren mit offensichtlichen Transportschäden angeliefert, so
          reklamierst Du solche Fehler bitte möglichst sofort beim Zusteller und
          nimmst bitte unverzüglich Kontakt zu uns auf. Die Versäumung einer
          Reklamation oder Kontaktaufnahme hat für Deine gesetzlichen Ansprüche
          und deren Durchsetzung, insbesondere Deine Gewährleistungsrechte,
          keinerlei Konsequenzen. Sie helfen uns aber, unsere eigenen Ansprüche
          gegenüber dem Frachtführer bzw. der Transportversicherung geltend
          machen zu können.
        </p>
        <h2>10. Gewährleistung und Garantien</h2>
        <p>
          Es gilt das gesetzliche Mängelhaftungsrecht. Informationen zu
          gegebenenfalls geltenden zusätzlichen Garantien und deren genaue
          Bedingungen findest Du jeweils beim Produkt und auf besonderen
          Informationsseiten im Onlineshop.
        </p>
        <p>
          <strong>Kundendienst:</strong>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${allSettings.email}`} rel="nofollow">
            {allSettings.email}
          </a>
          <br />
          Telefon:{" "}
          <a href={`tel:${allSettings.tel}`} rel="nofollow">
            {allSettings.tel}
          </a>{" "}
          (9-18 Uhr)
        </p>
        <h2>11. Haftung</h2>
        <p>
          Für Ansprüche aufgrund von Schäden, die durch uns, unsere gesetzlichen
          Vertreter oder Erfüllungsgehilfen verursacht wurden, haften wir stets
          unbeschränkt
        </p>
        <ul className="agb--list">
          <li>bei Verletzung des Lebens, des Körpers oder der Gesundheit,</li>
          <li>bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung,</li>
          <li>bei Garantieversprechen, soweit vereinbart, oder</li>
          <li>
            soweit der Anwendungsbereich des Produkthaftungsgesetzes eröffnet
            ist.
          </li>
        </ul>
        <br />
        <p>
          Bei Verletzung wesentlicher Vertragspflichten, deren Erfüllung die
          ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht
          und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen
          darf, (Kardinalpflichten) durch leichte Fahrlässigkeit von uns,
          unseren gesetzlichen Vertretern oder Erfüllungsgehilfen ist die
          Haftung der Höhe nach auf den bei Vertragsschluss vorhersehbaren
          Schaden begrenzt, mit dessen Entstehung typischerweise gerechnet
          werden muss. Im Übrigen sind Ansprüche auf Schadensersatz
          ausgeschlossen.
        </p>
        <h2>12. Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit, die Du hier findest{" "}
          <Link
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="nofollow"
          >
            https://ec.europa.eu/consumers/odr/
          </Link>
          . Verbraucher haben die Möglichkeit, diese Plattform für die Beilegung
          ihrer Streitigkeiten zu nutzen. Zur Beilegung von Streitigkeiten aus
          einem Vertragsverhältnis mit einem Verbraucher bzw. darüber, ob ein
          solches Vertragsverhältnis überhaupt besteht, sind wir zur Teilnahme
          an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          verpflichtet. Zuständig ist die Allgemeine
          Verbraucherschlichtungsstelle des Zentrums für Schlichtung e.V.,
          Straßburger Straße 8, 77694 Kehl am Rhein,{" "}
          <Link
            href="https://www.verbraucher-schlichter.de"
            target="_blank"
            rel="nofollow"
          >
            www.verbraucher-schlichter.de
          </Link>
          . An einem Streitbeilegungsverfahren vor dieser Stelle werden wir
          teilnehmen.
        </p>
      </div>
    </div>
  );
}

export default AGB;
