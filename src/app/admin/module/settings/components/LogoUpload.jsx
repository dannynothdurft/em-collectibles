/* 
  Datei: LogoUpload.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In dieser Komponente wird das Logo Hochgeladen.
*/

"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";

import Image from "next/image";
import { incrementSettings } from "../reducers/settings";

function LogoUpload() {
  const dispatch = useDispatch();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const { allSettings } = useSelector((state) => state.settings);
  const [logo, setLogo] = useState([]);

  const handleLogoChange = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    setFilesToBase(fileArray);
  };

  const setFilesToBase = (files) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setLogo((prevImgUrls) => [...prevImgUrls, ...base64Images]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imageSave = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/settings/api/update`,
        {
          img: logo,
          folder: "settings",
          data: allSettings,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateState = {
          ...allSettings,
          logo: response.data.data,
        };
        dispatch(incrementSettings(updateState));
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Upss.. Etwas ist schief gelaufen");
    }
  };

  return (
    <div className="settings--image--upload">
      <input type="file" onChange={handleLogoChange} />
      <div className="image--container">
        {allSettings !== undefined ? (
          <Image src={allSettings.logo} width={100} height={100} alt="Logo" />
        ) : (
          <p>Logo</p>
        )}
      </div>
      <button onClick={imageSave}>Bild Speichern</button>
    </div>
  );
}

export default LogoUpload;
