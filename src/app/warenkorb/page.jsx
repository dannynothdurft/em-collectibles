/* 
  Datei: warenkorb/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import "@/styles/basket.scss";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const [allBasket, setAllBasket] = useState([]);

  const [value, setValue] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("basket"))) {
      const localItem = JSON.parse(localStorage.getItem("basket"));
      if (Array.isArray(localItem)) {
        const updatedBasket = localItem.filter(
          (item) => new Date() < new Date(item.expiration)
        );
        setAllBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
      }
    }
  }, []);

  useEffect(() => {
    if (allBasket !== []) {
      const totalPrice = allBasket.reduce((accumulator, currentItem) => {
        const itemPrice = parseFloat(currentItem.price.$numberDecimal);
        return accumulator + itemPrice;
      }, 0);

      setValue(totalPrice.toFixed(2));
    }
  }, [allBasket]);

  const deleteFromBasket = async (id) => {
    const cart = JSON.parse(localStorage.getItem("basket"));
    const itemIndex = cart.findIndex((item) => item._id === id);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("basket", JSON.stringify(cart));
      setAllBasket(cart);
    }

    try {
      const response = await axios.post(
        `${currentUrl}/api/article/updatestatus`,
        {
          newEntry: { _id: id },
          status: "Ja",
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        console.log("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const nextStep = () => {
    router.push("/warenkorb/step1");
  };

  return (
    <div className="basket--container">
      <div className="basket--content">
        <div className="basket--list">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Artikle</th>
                <th>Mänge</th>
                <th>Preis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allBasket.map((product) => {
                return (
                  <tr key={product._id}>
                    <th>
                      <Image
                        src={product.image}
                        width={40}
                        height={40}
                        alt="Produkt Bild"
                      />
                    </th>
                    <th>{product.titel}</th>
                    <th>{product.quantity}</th>
                    <th>{product.price.$numberDecimal} €</th>
                    <th className="th--delete">
                      <button onClick={() => deleteFromBasket(product._id)}>
                        <MdDelete className="delete--icon" />
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {allBasket.map((product) => {
            return (
              <div className="basket--list--card" key={product._id}>
                <div className="image--container">
                  <Image
                    src={product.image}
                    width={40}
                    height={40}
                    alt="Produkt Bild"
                  />
                </div>
                <div className="content--container">
                  <p>{product.titel}</p>
                  <p>
                    Preis: <span>{product.price.$numberDecimal} €</span>
                  </p>
                  <p>
                    Menge: <span>{product.quantity}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="basket--action">
          <div className="basket--action--content">
            <p>Dein Warenkorb: {allBasket.length} Artikel</p>
            <div className="basket--summe">
              <p>
                Gesamtbetrag <br /> <span>inkl. MwSt.</span>
              </p>
              <p>{value} €</p>
            </div>
          </div>
          <div className="basket--button--container">
            <Button content="Zur Kasse" onClick={nextStep} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
