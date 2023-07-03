/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Versandinformationen",
  description: `Erfahre alles über unsere Versandrichtlinien und -optionen.`,
  keywords: `Versand, Versandinformationen, Lieferung`,
  robots: "noindex,nofollow",
  
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
