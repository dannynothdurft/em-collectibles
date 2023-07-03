/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss"; // Import des SCSS-Stils für die AGB

export const metadata = {
  title: "AGB",
  description: `Hier findest du unsere Allgemeinen Geschäftsbedingungen für den Kauf von Grading-Karten.`,
  keywords: "AGB,Geschäftsbedingungen,Kauf,Grading-Karten",
  robots: "noindex,nofollow",
  viewport: "width=device-width, initial-scale=1.0",
  //authors: [{ name: "Danny Nothdurft" }],
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
