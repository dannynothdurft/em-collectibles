/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Kontakt",
  description: `Nimm Kontakt mit uns auf und wir helfen dir gerne weiter.`,
  keywords: `Kontakt, Anfrage, Unterstützung`,
  robots: "noindex,nofollow",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
