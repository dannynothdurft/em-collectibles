/* 
  Datei: ArticleFilter.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In diesr Komponente wird der Filter Verwaltet um die Produkte aus der Datenbank zu Filtern die in dem Reducer gespeichert werden.
*/

"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementFilter } from "../reducers/allProducts";

function ArticleFilter() {
  const dispatch = useDispatch();
  const { products, filterProducts } = useSelector(
    (state) => state.allProducts
  );

  const [filterAttr, setFilterAttr] = useState({
    active: "",
    name: "",
    cardNumber: "",
    grading: "",
    evaluation: "",
  });

  const handleInputChange = ({ currentTarget: input }) => {
    setFilterAttr({
      ...filterAttr,
      [input.name]: input.value,
    });
  };

  const filter = () => {
    const filterProducts = products.filter((product) => {
      return (
        product.active.includes(filterAttr.active) &&
        product.name.includes(filterAttr.name) &&
        product.cardNumber.includes(filterAttr.cardNumber) &&
        product.grading.includes(filterAttr.grading) &&
        product.evaluation.$numberDecimal.includes(filterAttr.evaluation)
      );
    });
    if (filterProducts.length !== 0 && filterProducts[0] !== undefined) {
      dispatch(incrementFilter(filterProducts));
    } else {
      dispatch(incrementFilter(null));
    }
  };

  return (
    <div className="article--filter--container">
      <input
        className="input--active"
        type="text"
        placeholder="Aktive ?"
        value={filterAttr.active}
        name="active"
        onChange={handleInputChange}
      />

      <input
        className="input--cardname"
        type="text"
        placeholder="Kartenname"
        value={filterAttr.name}
        name="name"
        onChange={handleInputChange}
      />

      <input
        className="input--cardnumber"
        type="text"
        placeholder="Kartennummer"
        value={filterAttr.cardNumber}
        name="cardNumber"
        onChange={handleInputChange}
      />

      <input
        className="input--grading"
        type="text"
        placeholder="Grading ?"
        value={filterAttr.grading}
        name="grading"
        onChange={handleInputChange}
      />
      <input
        className="input--evaluation"
        type="text"
        placeholder="Bewertung"
        value={filterAttr.evaluation}
        name="evaluation"
        onChange={handleInputChange}
      />

      <button onClick={filter}>Filter Anwenden</button>
    </div>
  );
}

export default ArticleFilter;
