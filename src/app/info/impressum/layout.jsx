/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Impressum",
  description: `Hier findest du Informationen zu unserem Unternehmen und unseren Kontaktdaten.`,
  keywords: `Impressum, Unternehmen, Kontaktdaten`,
  robots: "noindex,nofollow",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
