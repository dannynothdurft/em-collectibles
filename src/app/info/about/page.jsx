/* 
  Datei: /about/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält die Über uns Seite der Shop-Anwendung.
*/

"use client";
import { useSelector } from "react-redux";

function About() {
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <>
      <div className="about--container">
        <h1> Über uns</h1>

        <h2>Willkommen bei {allSettings.company}!</h2>
        <p>
          Wir sind begeisterte Sammler und Enthusiasten für Pokémon-Karten und
          haben unsere Leidenschaft in ein einzigartiges Online-Erlebnis
          verwandelt. Was als Programmier-Projekt begann, um mit next.js zu
          arbeiten, entwickelte sich zu einer Plattform für hochwertige
          Grading-Karten.
        </p>
        <p>
          Unser Fokus liegt darauf, unseren Kunden qualitativ hochwertige und
          zertifizierte Pokémon-Karten anzubieten. Wir verstehen, dass die
          Vertrauenswürdigkeit und Authentizität der Karten für Sammler von
          größter Bedeutung sind. Deshalb arbeiten wir mit erfahrenen und
          renommierten Grading-Unternehmen zusammen, um sicherzustellen, dass
          jede Karte, die unseren Shop verlässt, gründlich geprüft und bewertet
          wurde.
        </p>
        <p>
          Unser Ziel ist es, die Freude am Sammeln und Handeln von
          Pokémon-Karten zu fördern und gleichzeitig eine vertrauenswürdige
          Quelle für Sammler auf der ganzen Welt zu sein. Wir bieten eine breite
          Auswahl an Karten verschiedener Editionen, Seltenheitsstufen und
          Zustände an, damit du deine Sammlung erweitern und deine
          Lieblingskarten finden kannst.
        </p>
        <p>
          Unser Team besteht aus leidenschaftlichen Pokémon-Fans und Experten im
          Bereich E-Commerce und Technologie. Wir sind bestrebt, unseren Kunden
          ein reibungsloses Einkaufserlebnis zu bieten, von der einfachen
          Navigation auf unserer Website bis hin zum schnellen Versand und
          exzellentem Kundenservice.
        </p>
        <p>
          Vielen Dank, dass du Teil unserer Reise bist und uns dabei
          unterstützt, die Welt der Pokémon-Karten mit Vertrauen und
          Leidenschaft zu bereichern.
        </p>
      </div>
    </>
  );
}

export default About;
