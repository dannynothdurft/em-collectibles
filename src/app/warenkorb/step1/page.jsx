/* 
  Datei: step1/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ToggleSwitch from "@/app/admin/module/article/article/components/ToggleSwitch";
import "@/styles/basket.scss";

function StepOne() {
  const router = useRouter();
  const [same, setSame] = useState(true);

  const [shipping, setShipping] = useState({
    gender: "",
    firstname: "",
    lastname: "",
    street: "",
    houseNumber: "",
    addressSupplement: "",
    zip: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  const [invoice, setInvoice] = useState({
    gender: "",
    firstname: "",
    lastname: "",
    street: "",
    houseNumber: "",
    addressSupplement: "",
    zip: "",
    city: "",
    country: "",
  });

  const onChangeShipping = (e) => {
    const { name, value } = e.target;
    setShipping((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onChangeInvoice = (e) => {
    const { name, value } = e.target;
    setInvoice((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("shippingAdresse"))) {
      setShipping(JSON.parse(localStorage.getItem("shippingAdresse")));
    }
    if (JSON.parse(localStorage.getItem("invoiceAdresse"))) {
      setSame(false);
      setInvoice(JSON.parse(localStorage.getItem("invoiceAdresse")));
    }
  }, []);

  const nextStep = () => {
    toast.loading("Loading...");
    if (
      shipping.firstname !== "" &&
      shipping.lastname !== "" &&
      shipping.street !== "" &&
      shipping.houseNumber !== "" &&
      shipping.zip !== "" &&
      shipping.city !== "" &&
      shipping.country !== "" &&
      shipping.email !== ""
    ) {
      let shippingAd;

      if (JSON.parse(localStorage.getItem("shippingAdresse"))) {
        shippingAd = JSON.parse(localStorage.getItem("shippingAdresse"));
      } else {
        shippingAd = [];
      }
      localStorage.setItem("shippingAdresse", JSON.stringify(shipping));

      if (!same) {
        if (
          invoice.firstname !== "" &&
          invoice.lastname !== "" &&
          invoice.street !== "" &&
          invoice.houseNumber !== "" &&
          invoice.zip !== "" &&
          invoice.city !== "" &&
          invoice.country !== ""
        ) {
          let invoiceAd;

          if (JSON.parse(localStorage.getItem("invoiceAdresse"))) {
            invoiceAd = JSON.parse(localStorage.getItem("invoiceAdresse"));
          } else {
            invoiceAd = [];
          }
          localStorage.setItem("invoiceAdresse", JSON.stringify(invoice));
          toast.dismiss();
          router.push("/warenkorb/step2");
        } else {
          toast.dismiss();
          toast.error("Fülle alle Pflichtfelder aus");
        }
      } else {
        localStorage.removeItem("invoiceAdresse");
        toast.dismiss();
        router.push("/warenkorb/step2");
      }
    } else {
      toast.dismiss();
      toast.error("Fülle alle Pflichtfelder aus");
    }
  };

  const toggleSwitch = () => {
    setSame(!same);
  };

  return (
    <div className="checkout--step1">
      <h2>Lieferadresse</h2>
      <div>
        <div className="input--container">
          <input
            type="text"
            id="gender"
            name="gender"
            value={shipping.gender}
            onChange={onChangeShipping}
            minLength="3"
            maxLength="50"
            autoComplete="off"
            placeholder="Anrede"
            required
            className="input--input"
          />
          <label htmlFor="name" className="input--label">
            Anrede
          </label>
        </div>
        <div className="flexbox">
          <div className="input--container">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={shipping.firstname}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Vorname *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Vorname *
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={shipping.lastname}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Nachname *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Nachname *
            </label>
          </div>
        </div>
        <div className="flexbox">
          <div className="input--container">
            <input
              type="text"
              id="street"
              name="street"
              value={shipping.street}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Straße *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Straße *
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={shipping.houseNumber}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Hausnummer *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Hausnummer *
            </label>
          </div>
        </div>
        <div className="input--container">
          <input
            type="text"
            id="addressSupplement"
            name="addressSupplement"
            value={shipping.addressSupplement}
            onChange={onChangeShipping}
            minLength="3"
            maxLength="50"
            autoComplete="off"
            placeholder="Adresszusatz"
            required
            className="input--input"
          />
          <label htmlFor="name" className="input--label">
            Adresszusatz
          </label>
        </div>
        <div className="flexbox">
          <div className="input--container">
            <input
              type="text"
              id="zip"
              name="zip"
              value={shipping.zip}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="PLZ *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              PLZ *
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="city"
              name="city"
              value={shipping.city}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Stadt *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Stadt *
            </label>
          </div>
        </div>
        <div className="input--container">
          <input
            type="text"
            id="country"
            name="country"
            value={shipping.country}
            onChange={onChangeShipping}
            minLength="3"
            maxLength="50"
            autoComplete="off"
            placeholder="Land *"
            required
            className="input--input"
          />
          <label htmlFor="name" className="input--label">
            Land *
          </label>
        </div>
        <div className="flexbox">
          <div className="input--container">
            <input
              type="text"
              id="email"
              name="email"
              value={shipping.email}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="E-Mail *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              E-Mail *
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={shipping.phoneNumber}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Telefonnummer"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Telefonnummer
            </label>
          </div>
        </div>
        <div className="flexbox">
          <div className="input--container">
            <input
              type="text"
              id="birthDay"
              name="birthDay"
              value={shipping.birthDay}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Geburtstag"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Geburtstag
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="birthMonth"
              name="birthMonth"
              value={shipping.birthMonth}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Geburtsmonat"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Geburtsmonat
            </label>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="birthYear"
              name="birthYear"
              value={shipping.birthYear}
              onChange={onChangeShipping}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Geburtsjahr"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Geburtsjahr
            </label>
          </div>
        </div>
      </div>
      <div className="toggle--container">
        <ToggleSwitch
          onClick={toggleSwitch}
          value="Ja"
          ask="Rechnungsadresse als Lieferadresse verwenden"
        />
      </div>
      {!same ? (
        <div>
          <h2>Rechnungsadresse</h2>
          <div className="input--container">
            <input
              type="text"
              id="gender"
              name="gender"
              value={invoice.gender}
              onChange={onChangeInvoice}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Anrede"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Anrede
            </label>
          </div>
          <div className="flexbox">
            <div className="input--container">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={invoice.firstname}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="Vorname *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                Vorname *
              </label>
            </div>
            <div className="input--container">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={invoice.lastname}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="Nachname *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                Nachname *
              </label>
            </div>
          </div>
          <div className="flexbox">
            <div className="input--container">
              <input
                type="text"
                id="street"
                name="street"
                value={invoice.street}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="Straße *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                Straße *
              </label>
            </div>
            <div className="input--container">
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                value={invoice.houseNumber}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="Hausnummer *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                Hausnummer *
              </label>
            </div>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="addressSupplement"
              name="addressSupplement"
              value={invoice.addressSupplement}
              onChange={onChangeInvoice}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Adresszusatz"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Adresszusatz
            </label>
          </div>
          <div className="flexbox">
            <div className="input--container">
              <input
                type="text"
                id="zip"
                name="zip"
                value={invoice.zip}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="PLZ *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                PLZ *
              </label>
            </div>
            <div className="input--container">
              <input
                type="text"
                id="city"
                name="city"
                value={invoice.city}
                onChange={onChangeInvoice}
                minLength="3"
                maxLength="50"
                autoComplete="off"
                placeholder="Stadt *"
                required
                className="input--input"
              />
              <label htmlFor="name" className="input--label">
                Stadt *
              </label>
            </div>
          </div>
          <div className="input--container">
            <input
              type="text"
              id="country"
              name="country"
              value={invoice.country}
              onChange={onChangeInvoice}
              minLength="3"
              maxLength="50"
              autoComplete="off"
              placeholder="Land *"
              required
              className="input--input"
            />
            <label htmlFor="name" className="input--label">
              Land *
            </label>
          </div>
        </div>
      ) : null}
      <div className="button--container">
        <Button content="Weiter" onClick={nextStep} />
      </div>
    </div>
  );
}

export default StepOne;
