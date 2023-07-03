/* 
  Datei: Footer.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält den Footer der Shop-Anwendung.
*/

import Image from "next/image"; // Import des Image-Komponenten aus Next.js
import "@/styles/footer.scss"; // Import des SCSS-Stils für den Footer
import Link from "next/link"; // Import der Link-Komponente aus Next.js
import { useSelector } from "react-redux";

function Footer() {
  const currentYear = new Date().getFullYear(); // Aktuelles Jahr ermitteln
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <div className="footer--container">
      <div className="footer--view--info">
        <div className="footer--view--headline">
          <Link href="/">
            <Image src={allSettings.logo} width={30} height={30} alt="Logo" />
            <h3>{allSettings.company}</h3>
          </Link>
        </div>

        <div className="footer--view--infolinks">
          <Link href="./info/impressum">Impressum</Link>
          <Link href="./info/about">Über uns</Link>
          <Link href="./info/agb">AGB</Link>
          <Link href="./info/datenschutz">Datenschutz</Link>
          <Link href="./info/kontakt">Kontakt</Link>
          <Link href="./info/versand">Versand</Link>
          <Link href="./info/widerrufsbelerung">Widerrufsbelerung</Link>
        </div>
      </div>

      <div className="footer--view--copy">
        &copy; {currentYear} {allSettings.company}. Alle Rechte vorbehalten.
      </div>
    </div>
  );
}

export default Footer;
