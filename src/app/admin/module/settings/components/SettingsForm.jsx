/* 
  Datei: SettingsForm.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Komponente enthält die SettingsForm der Admin-Anwendung.
*/

import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function SettingsForm() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const { allSettings } = useSelector((state) => state.settings);

  const [settings, setSettings] = useState({
    company: "",
    ceo: "",
    taxId: "",
    districtCourt: "",
    districtCourtID: "",
    street: "",
    streetNumber: "",
    city: "",
    plz: "",
    country: "",
    warehouseStreet: "",
    warehouseStreetNumber: "",
    warehouseCity: "",
    warehousePlz: "",
    mail: "",
    tel: "",
    host: "",
    hostStreet: "",
    hostCity: "",
    shippingCost: "",
    shippingService: "",
    shippingDays: "",
    returnPeriod: "",
    logo: "",
    billNumber: 0,
    deliveryNumber: 0,
  });

  useEffect(() => {
    if (typeof allSettings === "object") {
      setSettings(allSettings);
    }
  }, [allSettings]);

  const handleInputChange = ({ currentTarget: input }) => {
    setSettings({
      ...settings,
      [input.name]: input.value,
    });
  };

  const save = async () => {
    toast.loading("Loading...");
    const trimmedSettings = Object.entries(settings).reduce(
      (acc, [key, value]) => {
        acc[key] = typeof value === "string" ? value.trim() : value;
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/settings/api/save`,
        trimmedSettings
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Upss.. Etwas ist schief gelaufen");
    }
  };

  return (
    <div className="settings--form">
      <div>
        <p>Firmen Information</p>
        <Input
          label="Firma"
          name="company"
          value={settings.company}
          onChange={handleInputChange}
        />
        <Input
          label="Geschäftsführer"
          name="ceo"
          value={settings.ceo}
          onChange={handleInputChange}
        />
        <Input
          label="Steuernummer"
          name="taxId"
          value={settings.taxId}
          onChange={handleInputChange}
        />
        <Input
          label="Amstgericht"
          name="districtCourt"
          value={settings.districtCourt}
          onChange={handleInputChange}
        />
        <Input
          label="Amstgericht Nummer"
          name="districtCourtID"
          value={settings.districtCourtID}
          onChange={handleInputChange}
        />
        <div className="d-flex gap-25">
          <div>
            <p>Kontakt</p>
            <Input
              label="Straße"
              name="street"
              value={settings.street}
              onChange={handleInputChange}
            />
            <Input
              label="Nummer"
              name="streetNumber"
              value={settings.streetNumber}
              onChange={handleInputChange}
            />
            <Input
              label="Stadt"
              name="city"
              value={settings.city}
              onChange={handleInputChange}
            />
            <Input
              label="PLZ"
              name="plz"
              value={settings.plz}
              onChange={handleInputChange}
            />
            <Input
              label="Land"
              name="country"
              value={settings.country}
              onChange={handleInputChange}
            />
            <Input
              label="E-Mail"
              name="mail"
              value={settings.mail}
              onChange={handleInputChange}
            />
            <Input
              label="Telefon"
              name="tel"
              value={settings.tel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Lager Adresse</p>
            <Input
              label="Straße"
              name="warehouseStreet"
              value={settings.warehouseStreet}
              onChange={handleInputChange}
            />
            <Input
              label="Nummer"
              name="warehouseStreetNumber"
              value={settings.warehouseStreetNumber}
              onChange={handleInputChange}
            />
            <Input
              label="Stadt"
              name="warehouseCity"
              value={settings.warehouseCity}
              onChange={handleInputChange}
            />
            <Input
              label="PLZ"
              name="warehousePlz"
              value={settings.warehousePlz}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <p>Hosting</p>
        <Input
          label="Host"
          name="host"
          value={settings.host}
          onChange={handleInputChange}
        />
        <Input
          label="Host Adresse"
          name="hostStreet"
          value={settings.hostStreet}
          onChange={handleInputChange}
        />
        <Input
          label="Host Stadt"
          name="hostCity"
          value={settings.hostCity}
          onChange={handleInputChange}
        />
        <p>Versandinformation</p>
        <Input
          label="Versandkosten"
          name="shippingCost"
          value={settings.shippingCost}
          onChange={handleInputChange}
        />
        <Input
          label="Versanddienstleister"
          name="shippingService"
          value={settings.shippingService}
          onChange={handleInputChange}
        />
        <Input
          label="Versand Zeit"
          name="shippingDays"
          value={settings.shippingDays}
          onChange={handleInputChange}
        />
        <Input
          label="Returen Periode"
          name="returnPeriod"
          value={settings.returnPeriod}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p>Rechnungsinformation</p>
        <Input
          label="Rechnungsnummer"
          name="billNumber"
          value={settings.billNumber}
          onChange={handleInputChange}
        />
        <Input
          label="Lieferscheinsnummer"
          name="deliveryNumber"
          value={settings.deliveryNumber}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={save}>Speichern</button>
    </div>
  );
}

export default SettingsForm;
