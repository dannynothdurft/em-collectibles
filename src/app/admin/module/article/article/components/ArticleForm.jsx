/* 
  Datei: ArticleForm.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Komponente enthält die ArtikelForm der Admin-Anwendung.
*/

"use client";
import React, { useState, useEffect } from "react";
import Select from "./Select";
import ToggleSwitch from "./ToggleSwitch";
import dataSelect from "../../attribute/articleSelect.json";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { incrementProducts, addProdukt } from "../reducers/allProducts";
import { decrementData } from "../reducers/activeArticel";
import DelButton from "@/components/del-button/DelButton";

function ArticleForm() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.activeArticle);
  const { products } = useSelector((state) => state.allProducts);

  const [article, setArticle] = useState({
    active: "Nein",
    name: "",
    cardNumber: "",
    type: "",
    holo: "Nein",
    firstEdition: "Nein",
    rarityLevel: "",
    set: "",
    year: "",
    bgc: "",
    language: "",
    grading: "Nein",
    gradingCompany: "",
    gradingScale: "",
    certificateNumber: "",
    evaluation: "0",
    description: "",
    quantity: "1",
    price: "",
  });

  useEffect(() => {
    if (data !== undefined) {
      setArticle(data);
    } else if (data === undefined) {
      setArticle({
        active: "Nein",
        name: "",
        cardNumber: "",
        type: "",
        holo: "Nein",
        firstEdition: "Nein",
        rarityLevel: "",
        set: "",
        year: "",
        bgc: "",
        language: "",
        grading: "Nein",
        gradingCompany: "",
        gradingScale: "",
        certificateNumber: "",
        evaluation: "0",
        description: "",
        quantity: "1",
        price: "",
      });
    }
  }, [data]);

  const handleInputChange = ({ currentTarget: input }) => {
    if (input.name === "price") {
      setArticle({
        ...article,
        [input.name]: input.value.replace(",", "."),
      });
    } else {
      setArticle({
        ...article,
        [input.name]: input.value,
      });
    }
  };

  const handleSwitchClick = (key) => {
    if (article[key] === "Nein") {
      setArticle({
        ...article,
        [key]: "Ja",
      });
    } else if (article[key] === "Ja") {
      setArticle({
        ...article,
        [key]: "Nein",
      });
    }
  };

  const articleSave = () => {
    toast.loading("Loading...");
    if (
      article.name !== "" &&
      article.cardNumber !== "" &&
      article.type !== "" &&
      article.rarityLevel !== "" &&
      article.set !== "" &&
      article.year !== "" &&
      article.language !== "" &&
      article.price !== "" &&
      article.description !== ""
    ) {
      if (article.grading === "Nein") {
        if (data !== undefined) {
          update();
        } else {
          save();
        }
      } else if (article.grading === "Ja") {
        if (
          article.gradingCompany !== "" &&
          article.gradingScale !== "" &&
          article.certificateNumber !== "" &&
          article.evaluation !== ""
        ) {
          if (data !== undefined) {
            update();
          } else {
            save();
          }
        } else {
          toast.dismiss();
          toast.error("Fülle alle Grading Informationen aus");
        }
      }
    } else {
      toast.dismiss();
      toast.error("Fülle alle Pflicht Felder aus");
    }
  };

  const save = async () => {
    const trimmedArticle = Object.entries(article).reduce(
      (acc, [key, value]) => {
        if (key === "price") {
          const inputFieldValue = value;
          const inputNumber = parseFloat(inputFieldValue);
          const formattedNumber = inputNumber.toFixed(2);
          acc[key] = formattedNumber;
        } else {
          acc[key] = typeof value === "string" ? value.trim() : value;
        }
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/save`,
        trimmedArticle
      );

      if (response.status === 200) {
        toast.dismiss();
        dispatch(addProdukt(response.data.data));
        dispatch(decrementData(undefined));
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

  const update = async () => {
    const trimmedArticle = Object.entries(article).reduce(
      (acc, [key, value]) => {
        if (key === "price") {
          if (typeof value !== "object") {
            const inputFieldValue = value;
            const inputNumber = parseFloat(inputFieldValue);
            const formattedNumber = inputNumber.toFixed(2);
            acc[key] = formattedNumber;
          } else {
            acc[key] = typeof value === "string" ? value.trim() : value;
          }
        } else {
          acc[key] = typeof value === "string" ? value.trim() : value;
        }
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/update`,
        trimmedArticle
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateProduct = products.map((product) => {
          if (product._id === trimmedArticle._id) {
            return trimmedArticle;
          }
          return product;
        });

        dispatch(incrementProducts(updateProduct));
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

  const deleteArticle = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/article/article/api/delete`,
        { id: article._id }
      );
      if (response.status === 200) {
        toast.dismiss();
        const productsUpdate = products.filter(
          (product) => product._id !== article._id
        );
        dispatch(incrementProducts(productsUpdate));
        dispatch(decrementData(undefined));
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
    <div className="article--manage--form">
      <div className="article--manage--form--left-side">
        <ToggleSwitch
          ask="Aktive"
          value={article.active}
          onClick={() => handleSwitchClick("active")}
        />
        <label>
          Kartenname
          <input
            type="text"
            placeholder="Kartenname"
            value={article.name}
            name="name"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Kartennummer
          <input
            type="text"
            placeholder="Kartennummer"
            value={article.cardNumber}
            name="cardNumber"
            onChange={handleInputChange}
          />
        </label>
        <Select
          label="Karten Set"
          object={article}
          setObject={setArticle}
          value={article.set}
          ask="set"
          options={dataSelect.optionSet}
        />
        <label>
          Karten Jahr
          <input
            type="text"
            placeholder="Karten Jahr"
            value={article.year}
            name="year"
            onChange={handleInputChange}
          />
        </label>
        <Select
          label="Sprache"
          object={article}
          setObject={setArticle}
          value={article.language}
          ask="language"
          options={dataSelect.optionLanguage}
        />
        <Select
          label="Karten Type"
          object={article}
          setObject={setArticle}
          value={article.type}
          ask="type"
          options={dataSelect.optionType}
        />
        <Select
          label="Seltenheitsstufe"
          object={article}
          setObject={setArticle}
          value={article.rarityLevel}
          ask="rarityLevel"
          options={dataSelect.optionRarityLevel}
        />
        <ToggleSwitch
          ask="Holo"
          value={article.holo}
          onClick={() => handleSwitchClick("holo")}
        />
        <ToggleSwitch
          ask="First Edition"
          value={article.firstEdition}
          onClick={() => handleSwitchClick("firstEdition")}
        />
        <ToggleSwitch
          ask="Grading"
          value={article.grading}
          onClick={() => handleSwitchClick("grading")}
        />
        {article.grading === "Ja" ? (
          <>
            <Select
              label="Grading Firma"
              object={article}
              setObject={setArticle}
              value={article.gradingCompany}
              ask="gradingCompany"
              options={dataSelect.optonGradingCompany}
            />
            <Select
              label="Grading Scale"
              object={article}
              setObject={setArticle}
              value={article.gradingScale}
              ask="gradingScale"
              options={dataSelect.optionGradingScale}
            />
            <label>
              Grading Zertifikate
              <input
                type="text"
                placeholder="Grading Zertifikate"
                value={article.certificateNumber}
                name="certificateNumber"
                onChange={handleInputChange}
              />
            </label>
            <Select
              label="Grading Bewertung"
              object={article}
              setObject={setArticle}
              value={
                article.evaluation === null
                  ? article.evaluation
                  : typeof article.evaluation === "object"
                  ? article.evaluation.$numberDecimal
                  : article.evaluation
              }
              ask="evaluation"
              options={dataSelect.optionGradingEvaluation}
            />
          </>
        ) : null}
        <label>
          Preis
          <input
            type="text"
            placeholder="Preis"
            value={
              typeof article.price === "object"
                ? article.price.$numberDecimal
                : article.price
            }
            name="price"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Mänge
          <input
            type="text"
            placeholder="Mänge"
            value={article.quantity}
            name="quantity"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="article--manage--form--right--side">
        <label>
          Beschreibung
          <textarea
            value={article.description}
            name="description"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button
        className="article--manage--form--button--save"
        onClick={articleSave}
      >
        Speichern
      </button>

      {data !== undefined && (
        <div className="article--manage--form--button--delete">
          <DelButton onClick={deleteArticle} />
        </div>
      )}
    </div>
  );
}

export default ArticleForm;
