"use client";
/* 
  Datei: OneOrder.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { incrementOrders, incrementActiveOrder } from "../reducers/allOrders";
import { incrementProducts } from "../../article/article/reducers/allProducts";

function OneOrder() {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const dispatch = useDispatch();
  const { activeOrder, orders } = useSelector((state) => state.allOrders);
  const { products } = useSelector((state) => state.allProducts);
  const { allSettings } = useSelector((state) => state.settings);
  const [trackingnumber, setTrackingnumber] = useState("");

  const invoicePress = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/orders/api/invoicePress`,
        {
          activeOrder: activeOrder,
          settings: allSettings,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const orderEdit = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/orders/api/orderEdit`,
        {
          activeOrder: activeOrder,
          settings: allSettings,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateOrders = orders.map((order) => {
          if (order._id === activeOrder._id) {
            return response.data.data;
          }
          return order;
        });

        dispatch(incrementOrders(updateOrders));
        dispatch(incrementActiveOrder(response.data.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const orderShipping = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/orders/api/orderShipping`,
        {
          activeOrder: activeOrder,
          trackingnumber: trackingnumber,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateOrders = orders.map((order) => {
          if (order._id === activeOrder._id) {
            return response.data.data;
          }
          return order;
        });

        dispatch(incrementOrders(updateOrders));
        dispatch(incrementActiveOrder(response.data.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const orderStorno = async () => {
    toast.loading("Loading...");
    try {
      const response = await axios.post(
        `${currentUrl}/admin/module/orders/api/orderStorno`,
        {
          activeOrder: activeOrder,
          settings: allSettings,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const updateOrders = orders.map((order) => {
          if (order._id === activeOrder._id) {
            return response.data.data;
          }
          return order;
        });

        dispatch(incrementOrders(updateOrders));
        dispatch(incrementActiveOrder(response.data.data));

        const updatedProducts = response.data.data.orderBasket.reduce(
          (updatedProducts, orderItem) => {
            const productToUpdate = updatedProducts.find(
              (product) => product._id === orderItem._id
            );
            if (productToUpdate) {
              const updatedProduct = {
                ...productToUpdate,
                active: "Ja",
                quantity:
                  parseInt(productToUpdate.quantity) +
                  parseInt(orderItem.quantity),
              };
              return updatedProducts.map((product) =>
                product._id === orderItem._id ? updatedProduct : product
              );
            }
            return updatedProducts;
          },
          [...products]
        );

        dispatch(incrementProducts(updatedProducts));

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    activeOrder && (
      <div className="activeOrder--container">
        <div className="order--information">
          <div>
            <p>Rechnungsnummer: {activeOrder.billNumber}</p>
            <p>Rechnungsdatum: {activeOrder.orderDate}</p>
            <p>Telefone: {activeOrder.orderShipping.phoneNumber}</p>
            <p>E-Mail: {activeOrder.orderShipping.email}</p>
          </div>

          <div>
            <h4>Rechnungsadresse</h4>
            <p>{activeOrder.orderInvoice.gender}</p>
            <p>
              {activeOrder.orderInvoice.firstname}{" "}
              {activeOrder.orderInvoice.lastname}
            </p>
            <p>
              {activeOrder.orderInvoice.street}{" "}
              {activeOrder.orderInvoice.houseNumber}
            </p>
            <p>{activeOrder.orderInvoice.addressSupplement}</p>
            <p>
              {activeOrder.orderInvoice.zip} {activeOrder.orderInvoice.city}
            </p>
            <p>{activeOrder.orderInvoice.country}</p>
          </div>

          <div>
            <h4>Lieferadresse</h4>
            <p>{activeOrder.orderShipping.gender}</p>
            <p>
              {activeOrder.orderShipping.firstname}{" "}
              {activeOrder.orderShipping.lastname}
            </p>
            <p>
              {activeOrder.orderShipping.street}{" "}
              {activeOrder.orderShipping.houseNumber}
            </p>
            <p>{activeOrder.orderShipping.addressSupplement}</p>
            <p>
              {activeOrder.orderShipping.zip} {activeOrder.orderShipping.city}
            </p>
            <p>{activeOrder.orderShipping.country}</p>
          </div>

          <div>
            <p>Zahlungsart: {activeOrder.orderPayment}</p>
            <p>Bestellstatus: {activeOrder.orderStatus}</p>
            {activeOrder.trackingnumber ? (
              <p>
                Sendungsnummer:{" "}
                <a
                  href={`https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=${activeOrder.trackingnumber}`}
                >
                  {activeOrder.trackingnumber}
                </a>
              </p>
            ) : null}
          </div>
        </div>
        <div className="order--basket">
          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>Mänge</th>
                <th>Preis</th>
              </tr>
            </thead>
            <tbody>
              {activeOrder.orderBasket.map((item) => {
                return (
                  <tr key={item._id}>
                    <th>{item.titel}</th>
                    <th>{item.quantity}</th>
                    <th>{item.price.$numberDecimal} €</th>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th span="2">Rechnungsbetrag</th>
                <th />
                <th>{activeOrder.orderAmount} €</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="action--container">
          {activeOrder.orderStatus === "Bestellung wurde Storniert" ? null : (
            <button onClick={invoicePress}>Rechnung Drucken</button>
          )}

          {activeOrder.orderStatus === "Bestellung Eingegangen" ||
          activeOrder.orderStatus === "Bestellung Bezahlt" ? (
            <button onClick={orderEdit}>Auftrag Bearbeiten</button>
          ) : null}

          {activeOrder.trackingnumber ||
          activeOrder.orderStatus === "Bestellung wurde Storniert" ? null : (
            <>
              <label>
                Sendungsnummer
                <input
                  type="text"
                  placeholder="Sendungsnummer"
                  value={trackingnumber}
                  name="trackingnumber"
                  onChange={(event) => setTrackingnumber(event.target.value)}
                />
              </label>
              <button onClick={orderShipping}>Auftrag Versenden</button>
            </>
          )}

          {activeOrder.orderStatus !== "Bestellung wurde Storniert" ? (
            <button onClick={orderStorno}>Auftrag Stonieren</button>
          ) : null}
        </div>
      </div>
    )
  );
}

export default OneOrder;
