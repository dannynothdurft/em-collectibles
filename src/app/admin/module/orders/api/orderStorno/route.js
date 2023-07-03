/*
  Datei: orderStorno/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { generatePDF } from "../../utils/generatePDF";
import fs from "fs";
import orderStornoMail from "@/utils/mails/orderStornoMail";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const colArticle = database.collection("article");
  const colOrders = database.collection("orders");

  try {
    const reqBody = await request.json();
    const id = new ObjectId(reqBody.activeOrder._id);
    const activeOrder = reqBody.activeOrder;
    const settings = reqBody.settings;

    const htmlSubtemplate = activeOrder.orderBasket
      .map((item, index) => {
        return `
        <div class="subTemplat" key=${index}>
            <p>${index + 1}</p>
            <p>${item.titel}</p>
            <p>${item.quantity}</p>
            <p>-${item.price.$numberDecimal}</p>
            <p>-${(item.quantity * item.price.$numberDecimal).toFixed(2)}</p>
        </div>
    `;
      })
      .join("");

    const htmlTemplate = `<!DOCTYPE html>
      <html lang="de">
      
      <head>
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
      
              body {
                  font-family: Tahoma;
                  font-size: 12px;
                  color: #333333;
                  background-color: #FFFFFF;
                  height: 29.7cm;
                  width: 21cm;
                  font-size: 12px;
                  padding: 100px;
                  box-shadow: 0px 0px 5px gray;
                  position: relative;
              }
      
              .logo {
                  position: absolute;
                  top: 0;
                  left: calc(50% - 50px);
              }
      
              .adress {
                  position: absolute;
                  top: 155px;
                  font-size: 14px;
              }
      
              .company {
                  color: #00ab9f;
                  font-size: 9px;
                  text-decoration: underline;
                  margin-bottom: 5px;
              }
      
              .costumer {
                  font-weight: bold;
                  font-size: 15px;
              }
      
              .invoiceNumber {
                  position: absolute;
                  right: 300px;
                  top: 300px
              }
      
              .invoiceNumber>p:first-child {
                  font-weight: bold;
                  margin-bottom: 5px;
              }
      
              .orderDate {
                  position: absolute;
                  right: 100px;
                  top: 300px
              }
      
              .orderDate>p:first-child {
                  font-weight: bold;
                  margin-bottom: 5px;
              }
      
              .content {
                  position: absolute;
                  top: 370px;
                  font-size: 15px;
                  width: calc(100% - 200px);
              }
      
              .content>p:first-child {
                  font-weight: bold;
                  margin-bottom: 10px;
              }
      
              .orders {
                  position: absolute;
                  top: 520px;
                  width: calc(100% - 200px);
              }
      
              .ordersHeader {
                  display: flex;
                  border-top: 2px solid black;
                  border-bottom: 2px solid black;
                  padding: 10px 0;
                  font-weight: bold;
              }
      
              .ordersHeader>p {
                  margin-right: 10px;
              }
      
              .ordersHeader>p:nth-child(1) {
                  width: 35px;
              }
      
              .ordersHeader>p:nth-child(2) {
                  width: 425px;
              }
      
              .ordersHeader>p:nth-child(3) {
                  width: 60px;
                  text-align: center;
              }
      
              .ordersHeader>p:nth-child(4) {
                  width: 100px;
                  text-align: right;
              }
      
              .ordersHeader>p:nth-child(5) {
                  margin: 0;
                  width: 100px;
                  text-align: right;
              }
      
              .subTemplat {
                  display: flex;
                  padding: 10px 0;
              }
      
              .subTemplat>p {
                  margin-right: 10px;
              }
      
              .subTemplat>p:nth-child(1) {
                  width: 35px;
              }
      
              .subTemplat>p:nth-child(2) {
                  width: 425px;
              }
      
              .subTemplat>p:nth-child(3) {
                  width: 60px;
                  text-align: center;
              }
      
              .subTemplat>p:nth-child(4) {
                  width: 100px;
                  text-align: right;
              }
      
              .subTemplat>p:nth-child(5) {
                  margin: 0;
                  width: 100px;
                  text-align: right;
              }
      
              .ordersFooter {
                  position: absolute;
                  right: 0;
                  border-top: 2px solid black;
                  border-bottom: 2px solid #00ab9f;
                  display: flex;
                  gap: 25px;
                  font-size: 20px;
                  padding: 5px 0 15px 15px;
                  margin-top: 15px;
              }
      
              .invoiceInfo {
                  position: absolute;
                  bottom: 150px;
              }
      
              .invoiceInfo>p:first-child {
                  font-weight: bold;
                  margin-bottom: 10px;
              }
      
              .invoiceInfo>p:nth-child(3) {
                  font-weight: bold;
                  font-size: 16px;
                  color: #00ab9f;
              }
      
              .footer {
                  position: absolute;
                  bottom: 45px;
                  border-top: 1px solid #00ab9f;
                  border-bottom: 1px solid #bbbbbb;
                  width: calC(100% - 200px);
                  padding: 5px 5px 15px 5px;
                  display: flex;
                  justify-content: space-between;
              }
          </style>
      
      <body>
          <div class="logo">
              <img src=${settings.logo} width='100px' height='100px' />
          </div>
      
          <div class="adress">
              <p class="company">${settings.company} | ${settings.street} ${settings.streetNumber} | ${settings.plz}
                  ${settings.city}</p>
              <p class="costumer">${activeOrder.orderInvoice.gender} ${activeOrder.orderInvoice.firstname}
                  ${activeOrder.orderInvoice.lastname}</p>
              <p>${activeOrder.orderInvoice.street} ${activeOrder.orderInvoice.houseNumber}</p>
              <p>${activeOrder.orderInvoice.zip} ${activeOrder.orderInvoice.city}</p>
              <p>${activeOrder.orderInvoice.country}</p>
          </div>
      
          <div class="invoiceNumber">
              <p>Rechnungsnummer</p>
              <p>${activeOrder.billNumber}</p>
          </div>
      
          <div class="orderDate">
              <p>Rechnungsdatum</p>
              <p>${activeOrder.orderDate}</p>
          </div>
      
          <div class="content">
              <p>Hallo ${activeOrder.orderInvoice.firstname},</p>
              <p>solltest Du die Rechnung ${activeOrder.billNumber} bezahlt haben, haben wir dir bereits die Gutschrift
                  ausbezahlt.</p>
          </div>
      
          <div class="orders">
              <div class="ordersHeader">
                  <p>Pos.</p>
                  <p>Bezeichnung</p>
                  <p>Menge</p>
                  <p>Einzel (€)</p>
                  <p>Gesamt (€)</p>
              </div>
              <div class="ordersMain">
                  ${htmlSubtemplate}
              </div>
              <div class="ordersFooter">
                  <p>Stornobetrag*</p>
                  <p>-${activeOrder.orderAmount} €</p>
              </div>
          </div>
      
          <div class="invoiceInfo">
              <p>* Im Stornobetrag sind 19% MwSt enthalten.</p>
              <p>Liebe Grüße</p>
              <p>${settings.company}</p>
          </div>
      
          <div class="footer">
              <div>
                  <p>${settings.company}</p>
                  <p>${settings.street} ${settings.streetNumber}</p>
                  <p>${settings.plz} ${settings.city}</p>
              </div>
              <div>
                  <p>Tel.: ${settings.tel}</p>
                  <p>E-Mail: ${settings.mail}</p>
                  <p>Web: www.emcollectibles.de</p>
              </div>
              <div>
                  <p>${settings.bank}</p>
                  <p>IBAN: ${settings.iban}</p>
                  <p>BIC: ${settings.bic}</p>
                  <p>kto. Inh.: ${settings.ceo}</p>
              </div>
      
          </div>
      </body>
      </html>`;

    const getOrder = await colOrders.updateOne(
      { _id: id },
      { $set: { orderStatus: "Bestellung wurde Storniert" } }
    );

    const pdfBuffer = await generatePDF(htmlTemplate);

    if (getOrder.acknowledged) {
      const updatedOrder = await colOrders.findOne({ _id: id });

      const filePath =
        "/Users/danny/Downloads/storno-" + activeOrder.billNumber + ".pdf";

      fs.writeFile(filePath, pdfBuffer, (error) => {
        if (error) {
          console.error("Fehler beim Speichern des PDF-Dokuments:", error);
          return;
        }
      });

      for (const item of activeOrder.orderBasket) {
        const article = await colArticle.findOne({
          _id: new ObjectId(item._id),
        });

        if (article) {
          await colArticle.updateOne(
            { _id: new ObjectId(item._id) },
            { $inc: { quantity: +item.quantity } }
          );

          if (article.quantity + item.quantity > 0) {
            await colArticle.updateOne(
              { _id: new ObjectId(item._id) },
              { $set: { active: "Ja" } }
            );
          }
        }
      }

      await orderStornoMail({ updatedOrder: updatedOrder, pdf: pdfBuffer });

      return NextResponse.json({
        success: true,
        message: "Bestellung Storniert",
        data: updatedOrder,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: 500,
      message: error,
    });
  }
}
