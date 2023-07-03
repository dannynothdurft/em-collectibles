/*
  Datei: .../route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { NextResponse } from "next/server";
import { generatePDF } from "../../utils/generatePDF";
import fs from "fs";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const activeOrder = reqBody.activeOrder;
    const settings = reqBody.settings;

    const htmlSubtemplate = activeOrder.orderBasket
      .map((item, index) => {
        return `
        <div class="subTemplat" key=${index}>
            <p>${index + 1}</p>
            <p>${item.titel}</p>
            <p>${item.quantity}</p>
            <p>${item.price.$numberDecimal}</p>
            <p>${(item.quantity * item.price.$numberDecimal).toFixed(2)}</p>
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
              <p class="company">${settings.company} | ${settings.street} ${settings.streetNumber} | ${settings.plz} ${settings.city}</p>
              <p class="costumer">${activeOrder.orderInvoice.gender} ${activeOrder.orderInvoice.firstname} ${activeOrder.orderInvoice.lastname}</p>
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
              <p>vielen Dank für Deine Bestellung.</p>
              <p>Bitte zahle Deine Bestellung innerhalb von 7 Tagen. Sobald Deine Zahlung bei uns eingegangen ist, bekommst Du
                  eine Mail mit der Bestätigung und Deine Bestellung wird dann für den nächsten Schritt freigegeben.</p>
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
                  <p>Rechnungsbetrag*</p>
                  <p>${activeOrder.orderAmount} €</p>
              </div>
          </div>
      
          <div class="invoiceInfo">
              <p>* Im Rechnungsbetrag sind 19% MwSt enthalten.</p>
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

    const pdfBuffer = await generatePDF(htmlTemplate);

    const filePath =
      "/Users/danny/Downloads/" + activeOrder.billNumber + ".pdf";

    fs.writeFile(filePath, pdfBuffer, (error) => {
      if (error) {
        console.error("Fehler beim Speichern des PDF-Dokuments:", error);
        return;
      }

      console.log("PDF-Dokument erfolgreich gespeichert:", filePath);
    });

    return NextResponse.json({
      success: true,
      message: "Erfolgreich",
    });
  } catch (error) {
    return NextResponse.json({
      success: 500,
      message: error,
    });
  }
}
