/* 
  Datei: /kontakt/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält den Kontakt der Shop-Anwendung.
*/

"use client";
import ContactForm from "./components/ContactForm";
import { useSelector } from "react-redux";

function Contact() {
  const { allSettings } = useSelector((state) => state.settings);

  return (
    <div className="contact--container">
      <h1>Kontakt</h1>
      <h2>Hi!</h2>
      <p>
        Falls du eine Frage hast, schreib uns einfach eine{" "}
        <strong>E-Mail</strong> an {allSettings.email}, oder benutze das{" "}
        <strong>Kontaktformular</strong> auf dieser Seite.
      </p>
      <ContactForm />
    </div>
  );
}

export default Contact;
