/* 
  Datei: ContactForm.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Componente enthält das Kontakt Formular der Shop-Anwendung.
*/

"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function ContactForm() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Loading...");
      const response = await axios.post(
        `${currentUrl}/api/pushMails/pushContactForm`,
        formData
      );
      toast.dismiss();
      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Leider ist ein Fehler aufgetretten");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact--form">
      <div className="input--grid">
        <div className="input--container">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength="3"
            maxLength="50"
            autoComplete="off"
            placeholder="Name"
            required
            className="input--input"
          />
          <label htmlFor="name" className="input--label">
            Name
          </label>
        </div>

        <div className="input--container">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            minLength="3"
            maxLength="50"
            autoComplete="off"
            placeholder="E-Mail"
            required
            className="input--input"
          />
          <label htmlFor="email" className="input--label">
            E-Mail
          </label>
        </div>
      </div>

      <div className="input--container">
        <input
          type="subject"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          minLength="3"
          maxLength="50"
          autoComplete="off"
          placeholder="Betreff"
          required
          className="input--input"
        />
        <label htmlFor="subject" className="input--label">
          Betreff
        </label>
      </div>

      <div className="input--container">
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          minLength="20"
          autoComplete="off"
          placeholder="Nacricht"
          required
          className="input--textarea"
        />
        <label htmlFor="message" className="input--label">
          Nachricht
        </label>
      </div>

      <button type="submit" className="contact--submit--button">
        Senden
      </button>
    </form>
  );
}

export default ContactForm;
