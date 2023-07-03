/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Über uns",
  description: `Entdecke hochwertige Grading-Karten`,
  keywords: `Grading-Karten, Pokémon-Karten, Sammler, Online-Shop`,
  robots: "index,follow",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
