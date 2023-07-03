/* 
  Datei: ProductPage.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import "../style/productpage.scss";
import React, { useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { incrementArticles } from "@/redux/reducer/articles";
import { useRouter } from "next/navigation";

function ProductPage({ product }) {
  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const { allArticles } = useSelector((state) => state.articles);

  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);

  const switchImagesMinus = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const switchImagesPlus = () => {
    if (number < product.images.length - 1) {
      setNumber(number + 1);
    }
  };

  const switchImg = (index) => {
    setNumber(index);
  };

  const atToBasket = async () => {
    let allBasket;

    if (JSON.parse(localStorage.getItem("basket"))) {
      allBasket = JSON.parse(localStorage.getItem("basket"));
    } else {
      allBasket = [];
    }

    const expirationTimestamp = new Date();
    expirationTimestamp.setHours(expirationTimestamp.getHours() + 1);

    const newEntry = {
      _id: product._id,
      titel: `${product.name} - ${product.cardNumber} - ${product.set}`,
      cardNumber: product.cardNumber,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      expiration: expirationTimestamp,
    };

    const updateBasket = [...allBasket, newEntry];

    const updateArticles = allArticles.filter(
      (item) => item._id !== product._id
    );

    dispatch(incrementArticles(updateArticles));

    localStorage.setItem("basket", JSON.stringify(updateBasket));

    try {
      const response = await axios.post(`${currentUrl}/api/article/tobasket`, {
        newEntry: newEntry,
      });

      if (response.status === 200) {
        router.push("/warenkorb");
      } else {
        console.log("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="product--page--container">
      <div className="product--information">
        <div className="images--view">
          <div className="image--preview">
            <Image
              onClick={switchImagesMinus}
              src="/pfeilLeft.svg"
              className="pfeil left"
              width={50}
              height={50}
              alt="Linker Pfeil"
            />
            <Image
              src={product.images[number]}
              className="preview--image"
              width={400}
              height={400}
              alt={`${product.name} ${product.cardNumber} ${product.set}`}
            />
            <Image
              onClick={switchImagesPlus}
              src="/pfeilRight.svg"
              className="pfeil right"
              width={50}
              height={50}
              alt="Rechter Pfeil"
            />
          </div>
          <ul className="product--images--list">
            {product.images.map((img, i) => (
              <li key={i} wert={i} onClick={() => switchImg(i)}>
                <img
                  className={number === i ? "activ" : null}
                  src={img}
                  alt={`${product.name} ${product.cardNumber} ${product.set} / ${i}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="product--content-container">
          <h2>{product.name}</h2>
          <h3>
            {product.cardNumber} - {product.set}
          </h3>
          <div className="product--content">
            <div className="product--description">
              <p>{product.description}</p>
              <ul>
                <li>Kartenname: {product.name}</li>
                <li>Kartennummer: {product.cardNumber}</li>
                <li>Set: {product.set}</li>
                <li>Seltenheitsstufe: {product.rarityLevel}</li>
                <li>Erscheinungsjahr: {product.year}</li>
                <li>First Edition: {product.firstEdition}</li>
                <li>Grading: {product.grading}</li>
                {product.grading === "Ja" ? (
                  <>
                    <li>Grading Firma: {product.gradingCompany}</li>
                    <li>
                      Grading Bewertung: {product.gradingScale} /{" "}
                      {product.evaluation.$numberDecimal}
                    </li>
                    <li>Grading Zertifikat: {product.certificateNumber}</li>
                  </>
                ) : null}
              </ul>
            </div>
            <div className="product--action">
              <Button onClick={atToBasket} content="In den Warenkorb" />
              <p className="product--price">{product.price.$numberDecimal} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
