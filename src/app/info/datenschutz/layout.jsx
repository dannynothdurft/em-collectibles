/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Datenschutzerklärung",
  description: `Erfahre, wie wir deine persönlichen Daten schützen und verwenden.`,
  keywords: `Datenschutz, persönliche Daten, Datenschutzerklärung`,
  robots: "noindex,nofollow",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
