/* 
  Datei: settings/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In diesem Modul ist die Settings Seite.
*/

"use client";
import React from "react";
import "./style/settings.scss";
import SettingsForm from "./components/SettingsForm";
import LogoUpload from "./components/LogoUpload";

function Settings() {
  return (
    <div className="settings--page">
      <SettingsForm />
      <LogoUpload />
    </div>
  );
}

export default Settings;
