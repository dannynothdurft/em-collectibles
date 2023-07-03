/* 
  Datei: products/[id].page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Auf dieser Seite werden die Artikel angezeigt.
*/

"use client";
import React, { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";

import { useSelector } from "react-redux";

function Product({ params }) {
  const { allArticles } = useSelector((state) => state.articles);
  const [currentArticle, setCurrentArticle] = useState(undefined);

  const getArticle = () => {
    const filterArticle = allArticles.find(
      (product) => product._id === params.id
    );
    setCurrentArticle(filterArticle);
  };

  useEffect(() => {
    if (currentArticle === undefined) {
      getArticle();
    }
  }, []);

  return (
    <div>
      {currentArticle !== undefined ? (
        <ProductPage product={currentArticle} />
      ) : null}
    </div>
  );
}

export default Product;
