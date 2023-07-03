/* 
  Datei: ArticleList.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In diesem Modul werden alle Artikel ausgegebn die in der Datenbank hinterlegt sind.
*/

"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { incrementData } from "../reducers/activeArticel";
import { incrementProducts } from "../reducers/allProducts";
import DelButton from "@/components/del-button/DelButton";

function ArticleList() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const dispatch = useDispatch();
  const { products, filterProducts } = useSelector(
    (state) => state.allProducts
  );
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    if (filterProducts === null) {
      setListProducts([]);
    } else if (filterProducts !== undefined) {
      if (filterProducts.length !== 0) {
        setListProducts(filterProducts);
      }
    } else if (products.length !== 0) {
      setListProducts(products);
    } else {
      return;
    }
  }, [products, filterProducts]);

  const selectArticle = (article) => {
    dispatch(incrementData(article));
  };

  const deleteArticle = async (id) => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/delete`,
        { id: id }
      );

      if (response.status === 200) {
        toast.dismiss();
        const productsUpdate = products.filter((product) => product._id !== id);
        dispatch(incrementProducts(productsUpdate));
        dispatch(incrementData(undefined));
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Upss.. Etwas ist schief gelaufen");
    }
  };

  return (
    <div className="article--list--container">
      <table className="article--list--table">
        <thead className="article--list--table--head">
          <tr>
            <th className="th--active">Aktiv</th>
            <th className="th--name">Kartennamme</th>
            <th className="th--cardNumber">Kartennummer</th>
            <th className="th--grading">Grading</th>
            <th className="th--gradingEvaluation">Grading Bewertung</th>
            <th className="th--delete"></th>
          </tr>
        </thead>
        <tbody className="article--list--table--body">
          {listProducts &&
            listProducts.length > 0 &&
            listProducts.map((item) => {
              return (
                <tr key={item._id.toString()}>
                  <th className="th--active">{item.active}</th>
                  <th className="th--name" onClick={() => selectArticle(item)}>
                    {item.name}
                  </th>
                  <th className="th--cardNumber">{item.cardNumber}</th>
                  <th className="th--grading">{item.grading}</th>
                  <th className="th--gradingEvaluation">
                    {item.evaluation ? item.evaluation.$numberDecimal : "-"}
                  </th>
                  <th className="th--delete">
                    <DelButton onClick={() => deleteArticle(item._id)} small />
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
      {listProducts && listProducts.length <= 0 ? (
        <p className="article--list--error--text">
          Keiner Egebnisse mit diesem Filter
        </p>
      ) : null}
    </div>
  );
}

export default ArticleList;
