/* 
  Datei: step3/page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

"use client";
import "@/styles/basket.scss";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

//PayPal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function StepThree() {
  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const [basket, setBasket] = useState();
  const [shipping, setShipping] = useState();
  const [invoice, setInvoice] = useState();
  const [payment, setPayment] = useState();
  const [value, setValue] = useState();

  const clientID = ""; // Hier muss die ID von PAYPAL rein
  const style = { layout: "vertical", height: 30 };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("basket"))) {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    }
    if (JSON.parse(localStorage.getItem("shippingAdresse"))) {
      setShipping(JSON.parse(localStorage.getItem("shippingAdresse")));
    }
    if (JSON.parse(localStorage.getItem("invoiceAdresse"))) {
      setInvoice(JSON.parse(localStorage.getItem("invoiceAdresse")));
    }
    if (JSON.parse(localStorage.getItem("payment"))) {
      setPayment(JSON.parse(localStorage.getItem("payment")));
    }
  }, []);

  useEffect(() => {
    if (basket !== undefined) {
      const totalPrice = basket.reduce((accumulator, currentItem) => {
        const itemPrice = parseFloat(currentItem.price.$numberDecimal);
        return accumulator + itemPrice;
      }, 0);

      setValue(totalPrice);
    }
  }, [basket]);

  const ButtonWrapper = () => {
    return (
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[value, style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          const orderId = await actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: value,
                },
              },
            ],
          });
          return orderId;
        }}
        onApprove={async function (data, actions) {
          const details = await actions.order.capture();
          console.log(details);
          if (details.status === "COMPLETED") {
            orderNow();
          }
        }}
      />
    );
  };

  const orderNow = async () => {
    toast.loading("Loading...");

    try {
      const response = await axios.post(
        `${currentUrl}/api/article/orderbasket`,
        {
          shipping: shipping,
          invoice: invoice,
          payment: payment,
          orderPrice: value,
          status: 0,
          zahlung: 1,
          basket: basket,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        localStorage.removeItem("basket");
        localStorage.removeItem("shippingAdresse");
        localStorage.removeItem("invoiceAdresse");
        localStorage.removeItem("payment");
        router.push("/danke");
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error("Upss.. Etwas ist schief gelaufen");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <div className="checkout--step3">
      {shipping && (
        <div className="flex--adress">
          <div className="adress">
            <h2>Lieferadresse</h2>
            <p>{shipping.gender}</p>
            <p>
              {shipping.firstname} {shipping.lastname}
            </p>
            <p>
              {shipping.street} {shipping.houseNumber}
            </p>
            {shipping.addressSupplement && <p>{shipping.addressSupplement}</p>}
            <p>
              {shipping.zip} {shipping.city}
            </p>
            <p>{shipping.country}</p>
          </div>
          {invoice && (
            <div className="adress">
              <h2>Rechnungsadresse</h2>
              <p>{invoice.gender}</p>
              <p>
                {invoice.firstname} {invoice.lastname}
              </p>
              <p>
                {invoice.street} {invoice.houseNumber}
              </p>
              {invoice.addressSupplement && <p>{invoice.addressSupplement}</p>}
              <p>
                {invoice.zip} {invoice.city}
              </p>
              <p>{invoice.country}</p>
            </div>
          )}
        </div>
      )}

      {payment && (
        <div className="payment--container">
          <p>Zahlungsart: {payment}</p>
        </div>
      )}

      {basket &&
        basket.map((item) => {
          return (
            <div key={item._id} className="basket--card">
              <p>{item.titel}</p>
              <p>
                Menge: {item.quantity} <br />
                Preis: {item.price.$numberDecimal} €
              </p>
            </div>
          );
        })}

      {value && (
        <div className="endprice">
          <p>Gesammtpreis: {value.toFixed(2)} €</p>
        </div>
      )}

      {shipping && (
        <div className="send--mail--container">
          <p>
            Rechnung wird an folgende E-Mail versendet:{" "}
            <span>{shipping.email}</span>
          </p>
        </div>
      )}

      {payment === "PayPal" ? (
        <PayPalScriptProvider
          options={{
            clientId: clientID,
            // components: "buttons",
            currency: "EUR",
            // "disable-funding": ["sofort", "sepa"],
          }}
        >
          <ButtonWrapper />
        </PayPalScriptProvider>
      ) : (
        <Button content="Bestellung abschicken" onClick={orderNow} />
      )}
    </div>
  );
}

export default StepThree;
