/* 
  Datei: article/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält die Artikel Seite der Admin-Anwendung. Hier können alle Artikel Verwaltet werden.
*/

"use client";
import React, { useState } from "react";
import "./style/article.scss";
import ArticleFilter from "./components/ArticleFilter";
import ArticleList from "./components/ArticleList";
import ArticleForm from "./components/ArticleForm";
import ImageForm from "./components/ImageForm";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { decrementData } from "./reducers/activeArticel";

function Article() {
  const dispatch = useDispatch();

  const [reiter, setReiter] = useState({
    stamm: true,
    image: false,
  });

  const newArtikel = () => {
    dispatch(decrementData(undefined));
    toast.success("Jetzt Artikel neu anlegen");
  };

  const changeReiter = (reiterName) => {
    const updatedReiter = Object.keys(reiter).reduce((acc, key) => {
      acc[key] = key === reiterName;
      return acc;
    }, {});
    setReiter(updatedReiter);
  };

  return (
    <div className="article--page--container">
      <div className="article--action">
        <button className="article--action--button" onClick={newArtikel}>
          Neunen Artikel anlegen
        </button>
      </div>
      <div className="article--filter">
        <ArticleFilter />
      </div>
      <div className="article--show">
        <ArticleList />
      </div>
      <div className="article--manage">
        <div className="article--manage--button--container">
          <button
            key="stamm"
            className={`article--manage--button ${
              reiter.stamm ? "active" : null
            }`}
            onClick={() => changeReiter("stamm")}
          >
            Stamm
          </button>
          <button
            key="image"
            className={`article--manage--button ${
              reiter.image ? "active" : null
            }`}
            onClick={() => changeReiter("image")}
          >
            Bilder
          </button>
        </div>
        {reiter.stamm && <ArticleForm />}
        {}
        {reiter.image && <ImageForm />}
      </div>
    </div>
  );
}

export default Article;
