/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul ist der Einstigspunkt der Shop-Anwendung.
*/

import "@/styles/globals.scss";
import { Redux } from "@/provider/redux";
import LayoutProvider from "@/provider/LayoutProvider";

export const metadata = {
  title: {
    default: "EM-Collectibles",
    template: "%s",
  },
  keywords: ["EM-Collectibles", "Danny Nothdurft"],
  authors: [{ name: "Danny Nothdurft" }],
  creator: "Danny Nothdurft",
  publisher: "Danny Nothdurft",
  generator: "Danny Nothdurft",
  applicationName: "EM-Collectibles",
  siteName: "Home | EM-Collectibles",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Redux>
          <LayoutProvider>{children}</LayoutProvider>
        </Redux>
      </body>
    </html>
  );
}
