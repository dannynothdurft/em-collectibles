/* 
  Datei: layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul ist der Einstigspunkt der Admin-Anwendung.
*/

import Layout from "./provider/Layout";
import { Redux } from "./provider/redux";
import "./style/layout.scss";

function layout({ children }) {
  return (
    <Redux>
      <Layout>{children}</Layout>
    </Redux>
  );
}

export default layout;
