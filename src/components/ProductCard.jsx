/* 
  Datei: ProductCard.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieses Modul enthält die ProductCard der Shop-Anwendung.
*/

"use client";
import React, { useRef, useEffect, useState } from "react";
import "@/styles/productCard.scss";

import { BsEye } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

function ProductCard({ data }) {
  const targetElementRef = useRef(null);
  const [isMobileInViewport, setIsMobileInViewport] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      const isMobileDevice = /Mobi/.test(window.navigator.userAgent);

      const options = {
        threshold: 0.6,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isMobileDevice) {
              setIsMobileInViewport(true);
            }
          } else {
            setIsMobileInViewport(false);
          }
        });
      }, options);

      observer.observe(targetElementRef.current);
    }
  }, []);

  return (
    <>
      <div
        className="product--card--container"
        style={{ "--bgc": data.bgc, "--cardName": `"${data.name}"` }}
        ref={targetElementRef}
      >
        <div className="product--card--image--view">
          <Image
            className="product--card--image"
            width={150}
            height={400}
            src={data.images[0]}
            alt={`${data.name} - ${data.set} -  ${data.cardNumber}`}
          />
        </div>
        <div className="product--card--content--view">
          <p className="product--card--cardname">{data.name}</p>
          <p className="product--card--cardNumber">{data.cardNumber}</p>
          <p className="product--card--price">{data.price.$numberDecimal} €</p>
          <Link
            className={`product--card--link--button ${
              isMobileInViewport ? "isMobileInViewport" : null
            }`}
            href={`/products/${data._id}`}
          >
            Ansehen
          </Link>
        </div>
        <div className="product--card--icon--view">
          <Link href={`/products/${data._id}`}>
            <BsEye className="product--card--icon" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
