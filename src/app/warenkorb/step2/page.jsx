/* 
  Datei: step2/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import "@/styles/basket.scss";
import React, { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function StepTwo() {
  const router = useRouter();
  const [payment, setPayment] = useState();

  const changePayment = (value) => {
    setPayment(value);
  };
  console.log(payment);

  const nextStep = () => {
    localStorage.setItem("payment", JSON.stringify(payment));

    router.push("/warenkorb/step3");
  };

  return (
    <div className="checkout--step2">
      <div
        className="select--payment"
        onClick={() => changePayment("Vorkasse")}
      >
        {payment === "Vorkasse" ? (
          <div className="radio--active"></div>
        ) : (
          <div className="radio"></div>
        )}
        <Image
          src="/vorkasse.svg"
          height={60}
          width={200}
          alt="Vorkasse Logo"
        />
      </div>
      <hr className="hr" />
      <div className="select--payment" onClick={() => changePayment("PayPal")}>
        {payment === "PayPal" ? (
          <div className="radio--active"></div>
        ) : (
          <div className="radio"></div>
        )}
        <Image src="/paypal.svg" height={60} width={200} alt="PayPal Logo" />
      </div>

      <Button content="Weiter" onClick={nextStep} />
    </div>
  );
}

export default StepTwo;
