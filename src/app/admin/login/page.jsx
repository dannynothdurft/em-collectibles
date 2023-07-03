"use client";
/* 
  Datei: login/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import "../style/login.scss";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

function Login() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });

  const handleFormInputChange = ({ currentTarget: input }) => {
    setLoginForm({
      ...loginForm,
      [input.name]: input.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    setAlert(false);
    try {
      const response = await axios.post(`${currentUrl}/admin/login/api/login`, {
        user: loginForm.user,
        password: loginForm.password,
      });

      if (response.data.success) {
        localStorage.setItem("user", response.data.data);
        window.location.href = "/admin";
      } else {
        setAlertContent(response.data.message);
        setAlert(true);
      }
    } catch (error) {
      setAlertContent(error.message);
      setAlert(true);
    }
  };

  return (
    <div className="login--page">
      <div className="login--form">
        {alert ? <div className="alert-danger">{alertContent}</div> : null}

        <Image src="/logo512.png" width={90} height={90} alt="Firmenlogo" />
        <h2>EM-Collectibles | Admin-Breich</h2>
        <form onSubmit={login}>
          <label>
            Benutzername
            <input
              type="text"
              value={loginForm.user}
              name="user"
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Passwort
            <input
              type="password"
              value={loginForm.password}
              name="password"
              onChange={handleFormInputChange}
            />
          </label>
          <button>Einloggen</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
