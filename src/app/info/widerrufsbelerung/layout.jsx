/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import "@/styles/info.scss";

export const metadata = {
  title: "Widerrufsbelehrung",
  description: `Hier findest du Informationen zu deinem Widerrufsrecht und wie du es ausüben kannst.`,
  author: "Danny Nothdurft",
  keywords: `Widerrufsbelehrung, Widerrufsrecht, Rückgabe`,
  robots: "noindex,nofollow",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
