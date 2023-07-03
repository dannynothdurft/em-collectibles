/* 
  Datei: shop/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Auf dieser Seite werden alle Artikel angezeigt.
*/

"use client";
import "@/styles/shop.scss";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";

function Shop() {
  const { allArticles } = useSelector((state) => state.articles);

  return (
    <div className="shop--container">
      {allArticles.map((card) => {
        return <ProductCard key={card._id} data={card} />;
      })}
    </div>
  );
}

export default Shop;
