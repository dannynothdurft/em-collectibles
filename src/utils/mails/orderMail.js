/* 
  Datei: OrderMail.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import nodemailer from "nodemailer";
import settings from "@/utils/settings.json";
import puppeteer from "puppeteer";

module.exports = async (mailObj, zweck) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  const htmlSubtemplate = mailObj.orderBasket
    .map((item, index) => {
      return `
        <div class="subTemplat">
            <p>${index + 1}</p>
            <p>${item.titel}</p>
            <p>${item.quantity}</p>
            <p>${item.price.$numberDecimal}</p>
            <p>${(item.quantity * item.price.$numberDecimal).toFixed(2)}</p>
        </div>
    `;
    })
    .join("");

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

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
          <p class="costumer">${mailObj.orderInvoice.gender} ${mailObj.orderInvoice.firstname} ${mailObj.orderInvoice.lastname}</p>
          <p>${mailObj.orderInvoice.street} ${mailObj.orderInvoice.houseNumber}</p>
          <p>${mailObj.orderInvoice.zip} ${mailObj.orderInvoice.city}</p>
          <p>${mailObj.orderInvoice.country}</p>
      </div>
  
      <div class="invoiceNumber">
          <p>Rechnungsnummer</p>
          <p>${mailObj.billNumber}</p>
      </div>
  
      <div class="orderDate">
          <p>Rechnungsdatum</p>
          <p>${mailObj.orderDate}</p>
      </div>
  
      <div class="content">
          <p>Hallo ${mailObj.orderInvoice.firstname},</p>
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
              <p>${mailObj.orderAmount} €</p>
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

  await page.setContent(htmlTemplate);

  const pdfBuffer = await page.pdf({ format: "A4" });

  const subTemplate = mailObj.orderBasket
    .map((item) => {
      return `
      <tr>
      <!--[if !mso]><!-->
      <td class=t85
          style="overflow:hidden;width:800px;padding:0 0 20px 0;">
          <!--<![endif]-->
          <!--[if mso]><td class=t85 style="overflow:hidden;width:800px;padding:0 0 20px 0;"><![endif]-->
          <div class=t91
              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=342.61036 valign=top><![endif]-->
              <div class=t97
                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:75%;max-width:1275px;">
                  <table
                      role=presentation
                      width=100%
                      cellpadding=0
                      cellspacing=0
                      class=t99>
                      <tr>
                          <td
                              class=t100>
                              <p class=t101
                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                  ${item.titel}
                              </p>
                          </td>
                      </tr>
                  </table>
              </div>
              <!--[if mso]>
</td><td width=77.38964 valign=top><![endif]-->
              <div class=t107
                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:25%;max-width:330px;">
                  <table
                      role=presentation
                      width=100%
                      cellpadding=0
                      cellspacing=0
                      class=t109>
                      <tr>
                          <td
                              class=t110>
                              <p class=t111
                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#18B53A;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                  ${item.price.$numberDecimal} €
                              </p>
                          </td>
                      </tr>
                  </table>
              </div>
              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
          </div>
      </td>
  </tr>
      `;
    })
    .join("");

  const emailContent = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <meta name=x-apple-disable-message-reformatting>
  <meta http-equiv=X-UA-Compatible>
  <meta charset=utf-8>
  <meta name=viewport content=target-densitydpi=device-dpi>
  <meta content=true name=HandheldFriendly>
  <meta content=width=device-width name=viewport>
  <style type="text/css">
      table {
          border-collapse: separate;
          table-layout: fixed;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt
      }

      table td {
          border-collapse: collapse
      }

      .ExternalClass {
          width: 100%
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100%
      }

      * {
          line-height: inherit;
          text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -o-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale
      }

      html {
          -webkit-text-size-adjust: none !important
      }

      img+div {
          display: none;
          display: none !important
      }

      img {
          Margin: 0;
          padding: 0;
          -ms-interpolation-mode: bicubic
      }

      h1,
      h2,
      h3,
      p,
      a {
          line-height: 1;
          overflow-wrap: normal;
          white-space: normal;
          word-break: break-word
      }

      a {
          text-decoration: none
      }

      h1,
      h2,
      h3,
      p {
          min-width: 100% !important;
          width: 100% !important;
          max-width: 100% !important;
          display: inline-block !important;
          border: 0;
          padding: 0;
          margin: 0
      }

      a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important
      }

      a[href^="mailto"],
      a[href^="tel"],
      a[href^="sms"] {
          color: inherit;
          text-decoration: none
      }

      @media (min-width: 481px) {
          .hd {
              display: none !important
          }
      }

      @media (max-width: 480px) {
          .hm {
              display: none !important
          }
      }

      [style*="Albert Sans"] {
          font-family: 'Albert Sans', BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif !important;
      }

      [style*="Inter Tight"] {
          font-family: 'Inter Tight', BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif !important;
      }

      @media only screen and (min-width: 481px) {
          .t3 {
              mso-line-height-alt: 45px !important;
              line-height: 45px !important;
              display: block !important
          }

          .t9 {
              padding-left: 50px !important;
              padding-bottom: 60px !important;
              padding-right: 50px !important
          }

          .t11 {
              padding-left: 50px !important;
              padding-bottom: 60px !important;
              padding-right: 50px !important;
              width: 500px !important
          }

          .t15 {
              padding-left: 50px !important;
              padding-bottom: 15px !important;
              padding-right: 50px !important;
              width: 500px !important
          }

          .t20 {
              padding-left: 50px !important;
              padding-bottom: 15px !important;
              padding-right: 50px !important
          }

          .t21 {
              line-height: 26px !important;
              font-size: 24px !important;
              letter-spacing: -1.56px !important;
              mso-text-raise: 1px !important
          }

          .t28 {
              padding: 48px 50px !important
          }

          .t30 {
              padding: 48px 50px !important;
              width: 500px !important
          }

          .t55 {
              Margin-left: 0px !important
          }

          .t56 {
              padding-bottom: 60px !important;
              width: 130px !important
          }

          .t61 {
              padding-bottom: 60px !important
          }

          .t66 {
              padding-left: 50px !important;
              padding-right: 50px !important;
              width: 500px !important
          }

          .t71 {
              padding-left: 50px !important;
              padding-right: 50px !important
          }

          .t79 {
              padding: 40px !important
          }

          .t81 {
              padding: 40px !important;
              width: 540px !important
          }

          .t131,
          .t141 {
              font-size: 30px !important;
              mso-text-raise: 4px !important
          }

          .t148 {
              padding-left: 40px !important;
              padding-right: 40px !important
          }

          .t150 {
              padding-left: 40px !important;
              padding-right: 40px !important;
              width: 540px !important
          }

          .t162 {
              mso-line-height-alt: 0px !important;
              line-height: 0 !important;
              display: none !important
          }

          .t164 {
              width: 50% !important
          }

          .t165 {
              padding-left: inherit !important;
              padding-right: inherit !important
          }

          .t167,
          .t169 {
              padding-bottom: 0 !important;
              padding-right: 5px !important
          }

          .t232 {
              width: 50% !important
          }

          .t233 {
              padding-left: inherit !important;
              padding-right: inherit !important
          }

          .t235,
          .t237 {
              padding-left: 5px !important
          }

          .t303 {
              border-radius: 12px !important;
              padding-left: 5px !important;
              padding-right: 5px !important
          }

          .t305 {
              padding-left: 5px !important;
              padding-right: 5px !important;
              border-radius: 12px !important;
              width: 430px !important
          }

          .t309 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t314 {
              padding-right: 5px !important
          }

          .t321 {
              width: 35.48387% !important;
              max-width: 330px !important
          }

          .t325 {
              font-size: 16px !important
          }

          .t331 {
              width: 64.51613% !important
          }

          .t335 {
              font-size: 16px !important
          }

          .t339 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t344 {
              padding-right: 5px !important
          }

          .t351 {
              width: 35.41442% !important;
              max-width: 329px !important
          }

          .t355 {
              font-size: 16px !important
          }

          .t361 {
              width: 64.58558% !important
          }

          .t365 {
              font-size: 16px !important
          }

          .t372 {
              border-radius: 12px !important;
              padding-left: 5px !important;
              padding-right: 5px !important
          }

          .t374 {
              padding-left: 5px !important;
              padding-right: 5px !important;
              border-radius: 12px !important;
              width: 430px !important
          }

          .t378 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t383 {
              padding-right: 5px !important
          }

          .t390 {
              width: 36.17021% !important;
              max-width: 340px !important
          }

          .t394 {
              font-size: 16px !important
          }

          .t400 {
              width: 63.82979% !important
          }

          .t404 {
              font-size: 16px !important
          }

          .t408 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t413 {
              padding-right: 5px !important
          }

          .t420 {
              width: 36.17021% !important;
              max-width: 340px !important
          }

          .t424 {
              font-size: 16px !important
          }

          .t430 {
              width: 63.82979% !important
          }

          .t434 {
              font-size: 16px !important
          }

          .t438 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t443 {
              padding-right: 5px !important
          }

          .t450 {
              width: 36.17021% !important;
              max-width: 340px !important
          }

          .t454 {
              font-size: 16px !important
          }

          .t460 {
              width: 63.82979% !important
          }

          .t464 {
              font-size: 16px !important
          }

          .t468 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t473 {
              padding-right: 5px !important
          }

          .t480 {
              width: 36.17021% !important;
              max-width: 340px !important
          }

          .t484 {
              font-size: 16px !important
          }

          .t490 {
              width: 63.82979% !important
          }

          .t494 {
              font-size: 16px !important
          }

          .t498 {
              padding-right: 5px !important;
              width: 795px !important
          }

          .t503 {
              padding-right: 5px !important
          }

          .t510 {
              width: 36.17021% !important;
              max-width: 340px !important
          }

          .t514 {
              font-size: 16px !important
          }

          .t520 {
              width: 63.82979% !important
          }

          .t524 {
              font-size: 16px !important
          }
      }
  </style>
  <!--[if !mso]><!-->
  <link
      href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;700;800&family=Inter+Tight:wght@500;600;700;800&display=swap"
      rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <!--[if mso]>
<style type="text/css">
div.t3{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t11,td.t9{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important}td.t15,td.t20{padding-left:50px !important;padding-bottom:15px !important;padding-right:50px !important}h1.t21{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important;mso-text-raise:1px !important}td.t28,td.t30{padding:48px 50px !important}table.t55{Margin-left:0px !important}td.t56{padding-bottom:60px !important;width:130px !important}td.t61{padding-bottom:60px !important}td.t66,td.t71{padding-left:50px !important;padding-right:50px !important}td.t79{padding:40px !important}td.t81{padding:40px !important;width:620px !important}p.t131,p.t141{font-size:30px !important;mso-text-raise:4px !important}td.t148,td.t150{padding-left:40px !important;padding-right:40px !important}div.t162{mso-line-height-alt:0px !important;line-height:0 !important;display:none !important}div.t164{width:50% !important}div.t165{padding-left:inherit !important;padding-right:inherit !important}td.t167,td.t169{padding-bottom:0 !important;padding-right:5px !important}div.t232{width:50% !important}div.t233{padding-left:inherit !important;padding-right:inherit !important}td.t235,td.t237{padding-left:5px !important}td.t303{border-radius:12px !important;padding-left:5px !important;padding-right:5px !important}td.t305{padding-left:5px !important;padding-right:5px !important;border-radius:12px !important}td.t309,td.t314{padding-right:5px !important}td.t319{width:330px !important}div.t321{width:35.48387% !important;max-width:330px !important}p.t325{font-size:16px !important}div.t331{width:64.51613% !important}p.t335{font-size:16px !important}td.t339,td.t344{padding-right:5px !important}td.t349{width:329px !important}div.t351{width:35.41442% !important;max-width:329px !important}p.t355{font-size:16px !important}div.t361{width:64.58558% !important}p.t365{font-size:16px !important}td.t372{border-radius:12px !important;padding-left:5px !important;padding-right:5px !important}td.t374{padding-left:5px !important;padding-right:5px !important;border-radius:12px !important}td.t378,td.t383{padding-right:5px !important}td.t388{width:340px !important}div.t390{width:36.17021% !important;max-width:340px !important}p.t394{font-size:16px !important}div.t400{width:63.82979% !important}p.t404{font-size:16px !important}td.t408,td.t413{padding-right:5px !important}td.t418{width:340px !important}div.t420{width:36.17021% !important;max-width:340px !important}p.t424{font-size:16px !important}div.t430{width:63.82979% !important}p.t434{font-size:16px !important}td.t438,td.t443{padding-right:5px !important}td.t448{width:340px !important}div.t450{width:36.17021% !important;max-width:340px !important}p.t454{font-size:16px !important}div.t460{width:63.82979% !important}p.t464{font-size:16px !important}td.t468,td.t473{padding-right:5px !important}td.t478{width:340px !important}div.t480{width:36.17021% !important;max-width:340px !important}p.t484{font-size:16px !important}div.t490{width:63.82979% !important}p.t494{font-size:16px !important}td.t498,td.t503{padding-right:5px !important}td.t508{width:340px !important}div.t510{width:36.17021% !important;max-width:340px !important}p.t514{font-size:16px !important}div.t520{width:63.82979% !important}p.t524{font-size:16px !important}
</style>
<![endif]-->
  <!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>

<body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;">
  <div class=t1 style="background-color:#242424;">
      <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
          <tr>
              <td class=t525 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
                  <!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#242424 />
</v:background>
<![endif]-->
                  <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
                      <tr>
                          <td>
                              <div class=t3 style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center>
                                  <tr>
                                      <!--[if !mso]><!-->
                                      <td class=t11 style="background-color:#F8F8F8;overflow:hidden;width:600px;">
                                          <!--<![endif]-->
                                          <!--[if mso]><td class=t11 style="background-color:#F8F8F8;overflow:hidden;width:600px;"><![endif]-->
                                          <table role=presentation width=100% cellpadding=0 cellspacing=0>
                                              <tr>
                                                  <td>
                                                      <!--[if !mso]><!-->
                                                      <table class=t55 role=presentation cellpadding=0 cellspacing=0
                                                          style="Margin-left:auto;Margin-right:auto;">
                                                          <!--<![endif]-->
                                                          <!--[if mso]><table class=t55 role=presentation cellpadding=0 cellspacing=0 align=left><![endif]-->
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t56 style="width:80px;padding:0 0 50px 0;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t56 style="width:80px;padding:0 0 50px 0;"><![endif]-->
                                                                  <div style="font-size:0px;"><img class=t62
                                                                          style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                                          width=130 height=130 src=${settings.logo} />
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t14 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t15
                                                                  style="width:580px;padding:0 10px 20px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t15 style="width:600px;padding:0 10px 20px 10px;"><![endif]-->
                                                                  <h1 class=t21
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:28px;font-weight:800;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Hallo ${mailObj.orderShipping.firstname}, vielen Dank
                                                                      für Deine Bestellung.</h1>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t65 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Bitte zahle Deine Bestellung innerhalb von 7
                                                                      Tagen. Sobald Deine Zahlung eingegangen ist
                                                                      bekommst Du eine Mail mit der Bestätigung und
                                                                      Deine Bestellung wird dann für den nächsten
                                                                      Schritt freigegeben.</p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <div class=t297
                                                          style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">
                                                          &nbsp;</div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t304 role=presentation cellpadding=0 cellspacing=0
                                                          align=left>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t305
                                                                  style="background-color:#F6F6F6;overflow:hidden;width:420px;padding:10px 10px 10px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t305 style="background-color:#F6F6F6;overflow:hidden;width:440px;padding:10px 10px 10px 10px;"><![endif]-->
                                                                  <table role=presentation width=100% cellpadding=0
                                                                      cellspacing=0>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t308 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t309
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t309 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t315
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=150.80645 valign=top><![endif]-->
                                                                                              <div class=t321
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:41.17647%;max-width:420px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t323>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t324>
                                                                                                              <p class=t325
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  Rechnungnummer:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=274.19355 valign=top><![endif]-->
                                                                                              <div class=t331
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:58.82353%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t333>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t334>
                                                                                                              <p class=t335
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${mailObj.billNumber}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <div class=t336
                                                                                  style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                  &nbsp;</div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t338 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t339
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t339 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t345
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=150.5113 valign=top><![endif]-->
                                                                                              <div class=t351
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:41.17647%;max-width:420px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t353>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t354>
                                                                                                              <p class=t355
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  Rechnungsdatum:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=274.4887 valign=top><![endif]-->
                                                                                              <div class=t361
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:58.82353%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t363>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t364>
                                                                                                              <p class=t365
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${mailObj.orderDate}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <div class=t298
                                                          style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">
                                                          &nbsp;</div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t80 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t81
                                                                  style="background-color:#FFFFFF;overflow:hidden;width:382px;padding:30px 10px 30px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t81 style="background-color:#FFFFFF;overflow:hidden;width:402px;padding:30px 10px 30px 10px;"><![endif]-->
                                                                  <table role=presentation width=100% cellpadding=0
                                                                      cellspacing=0>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t84 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=center>
                                                                                  ${subTemplate}
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t114 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=center>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t115
                                                                                          style="border-top:1px solid #CCCCCC;overflow:hidden;width:800px;padding:20px 0 20px 0;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t115 style="border-top:1px solid #CCCCCC;overflow:hidden;width:800px;padding:20px 0 20px 0;"><![endif]-->
                                                                                          <div class=t121
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=210 valign=top><![endif]-->
                                                                                              <div class=t127
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t129>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t130>
                                                                                                              <p class=t131
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:44px;font-weight:800;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:left;mso-line-height-rule:exactly;mso-text-raise:7px;">
                                                                                                                  Gesamtpreis
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=210 valign=top><![endif]-->
                                                                                              <div class=t137
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t139>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t140>
                                                                                                              <p class=t141
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:44px;font-weight:800;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:right;mso-line-height-rule:exactly;mso-text-raise:7px;">
                                                                                                                  ${mailObj.orderAmount} €
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <div class=t366
                                                          style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">
                                                          &nbsp;</div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t373 role=presentation cellpadding=0 cellspacing=0
                                                          align=left>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t374
                                                                  style="background-color:#F6F6F6;overflow:hidden;width:420px;padding:10px 10px 10px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t374 style="background-color:#F6F6F6;overflow:hidden;width:440px;padding:10px 10px 10px 10px;"><![endif]-->
                                                                  <table role=presentation width=100% cellpadding=0
                                                                      cellspacing=0>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t377 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t378
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t378 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t384
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=153.7234 valign=top><![endif]-->
                                                                                              <div class=t390
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:45.45455%;max-width:500px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t392>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t393>
                                                                                                              <p class=t394
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  Empfänger:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=271.2766 valign=top><![endif]-->
                                                                                              <div class=t400
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:54.54545%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t402>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t403>
                                                                                                              <p class=t404
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${settings.company}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <div class=t405
                                                                                  style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                  &nbsp;</div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t407 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t408
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t408 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t414
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=153.7234 valign=top><![endif]-->
                                                                                              <div class=t420
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:45.45455%;max-width:500px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t422>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t423>
                                                                                                              <p class=t424
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  Bank:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=271.2766 valign=top><![endif]-->
                                                                                              <div class=t430
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:54.54545%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t432>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t433>
                                                                                                              <p class=t434
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${settings.bank}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <div class=t495
                                                                                  style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                  &nbsp;</div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t497 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t498
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t498 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t504
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=153.7234 valign=top><![endif]-->
                                                                                              <div class=t510
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:45.45455%;max-width:500px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t512>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t513>
                                                                                                              <p class=t514
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  IBAN:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=271.2766 valign=top><![endif]-->
                                                                                              <div class=t520
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:54.54545%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t522>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t523>
                                                                                                              <p class=t524
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${settings.iban}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <div class=t465
                                                                                  style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                  &nbsp;</div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t467 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t468
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t468 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t474
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=153.7234 valign=top><![endif]-->
                                                                                              <div class=t480
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:45.45455%;max-width:500px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t482>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t483>
                                                                                                              <p class=t484
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  BIC:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=271.2766 valign=top><![endif]-->
                                                                                              <div class=t490
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:54.54545%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t492>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t493>
                                                                                                              <p class=t494
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${settings.bic}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <div class=t435
                                                                                  style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                  &nbsp;</div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t437 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=left>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t438
                                                                                          style="overflow:hidden;width:800px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t438 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                          <div class=t444
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=153.7234 valign=top><![endif]-->
                                                                                              <div class=t450
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:45.45455%;max-width:500px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t452>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t453>
                                                                                                              <p class=t454
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  Verwendungszweck:
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=271.2766 valign=top><![endif]-->
                                                                                              <div class=t460
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:54.54545%;max-width:600px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t462>
                                                                                                      <tr>
                                                                                                          <td
                                                                                                              class=t463>
                                                                                                              <p class=t464
                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                  ${zweck}
                                                                                                              </p>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <div class=t367
                                                          style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">
                                                          &nbsp;</div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t149 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t150
                                                                  style="background-color:#FFFFFF;overflow:hidden;width:620px;padding:40px 0 40px 0;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t150 style="background-color:#FFFFFF;overflow:hidden;width:620px;padding:40px 0 40px 0;"><![endif]-->
                                                                  <table role=presentation width=100% cellpadding=0
                                                                      cellspacing=0>
                                                                      <tr>
                                                                          <td>
                                                                              <table class=t153 role=presentation
                                                                                  cellpadding=0 cellspacing=0
                                                                                  align=center>
                                                                                  <tr>
                                                                                      <!--[if !mso]><!-->
                                                                                      <td class=t154
                                                                                          style="background-color:#F0F0F0;overflow:hidden;width:520px;padding:40px 40px 40px 40px;">
                                                                                          <!--<![endif]-->
                                                                                          <!--[if mso]><td class=t154 style="background-color:#F0F0F0;overflow:hidden;width:600px;padding:40px 40px 40px 40px;"><![endif]-->
                                                                                          <div class=t160
                                                                                              style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                                              <!--[if mso]>
<table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=170 valign=top><![endif]-->
                                                                                              <div class=t164
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t166>
                                                                                                      <tr>
                                                                                                          <td class=t167
                                                                                                              style="overflow:hidden;padding:0 0 15px 0;">
                                                                                                              <table
                                                                                                                  role=presentation
                                                                                                                  width=100%
                                                                                                                  cellpadding=0
                                                                                                                  cellspacing=0>
                                                                                                                  <tr>
                                                                                                                      <td>
                                                                                                                          <table
                                                                                                                              class=t177
                                                                                                                              role=presentation
                                                                                                                              cellpadding=0
                                                                                                                              cellspacing=0
                                                                                                                              align=center>
                                                                                                                              <tr>
                                                                                                                                  <!--[if !mso]><!-->
                                                                                                                                  <td class=t178
                                                                                                                                      style="overflow:hidden;width:800px;">
                                                                                                                                      <!--<![endif]-->
                                                                                                                                      <!--[if mso]><td class=t178 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                                                                      <table
                                                                                                                                          role=presentation
                                                                                                                                          width=100%
                                                                                                                                          cellpadding=0
                                                                                                                                          cellspacing=0>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t181
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t182
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t182 style="width:600px;"><![endif]-->
                                                                                                                                                              <h1 class=t188
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                                                                  Lieferadresse
                                                                                                                                                              </h1>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <div class=t180
                                                                                                                                                      style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                                                                                      &nbsp;
                                                                                                                                                  </div>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t191
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t192
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t192 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t198
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderShipping.firstname} ${mailObj.orderShipping.lastname}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t201
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t202
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t202 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t208
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderShipping.street} ${mailObj.orderShipping.houseNumber}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t211
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t212
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t212 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t218
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderShipping.zip} ${mailObj.orderShipping.city}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t221
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t222
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t222 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t228
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderShipping.country}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                      </table>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                                  <!--[if !mso]><!-->
                                                                                                  <div class=t162
                                                                                                      style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">
                                                                                                      &nbsp;</div>
                                                                                                  <!--<![endif]-->
                                                                                              </div>
                                                                                              <!--[if mso]>
</td><td width=170 valign=top><![endif]-->
                                                                                              <div class=t232
                                                                                                  style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                                                                  <table
                                                                                                      role=presentation
                                                                                                      width=100%
                                                                                                      cellpadding=0
                                                                                                      cellspacing=0
                                                                                                      class=t234>
                                                                                                      <tr>
                                                                                                          <td class=t235
                                                                                                              style="overflow:hidden;">
                                                                                                              <table
                                                                                                                  role=presentation
                                                                                                                  width=100%
                                                                                                                  cellpadding=0
                                                                                                                  cellspacing=0>
                                                                                                                  <tr>
                                                                                                                      <td>
                                                                                                                          <table
                                                                                                                              class=t245
                                                                                                                              role=presentation
                                                                                                                              cellpadding=0
                                                                                                                              cellspacing=0
                                                                                                                              align=center>
                                                                                                                              <tr>
                                                                                                                                  <!--[if !mso]><!-->
                                                                                                                                  <td class=t246
                                                                                                                                      style="overflow:hidden;width:800px;">
                                                                                                                                      <!--<![endif]-->
                                                                                                                                      <!--[if mso]><td class=t246 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                                                                      <table
                                                                                                                                          role=presentation
                                                                                                                                          width=100%
                                                                                                                                          cellpadding=0
                                                                                                                                          cellspacing=0>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t249
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t250
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t250 style="width:600px;"><![endif]-->
                                                                                                                                                              <h1 class=t256
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                                                                  Rechnungsadresse
                                                                                                                                                              </h1>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <div class=t248
                                                                                                                                                      style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                                                                                      &nbsp;
                                                                                                                                                  </div>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t259
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t260
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t260 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t266
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderInvoice.firstname} ${mailObj.orderInvoice.lastname}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t269
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t270
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t270 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t276
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderInvoice.street} ${mailObj.orderInvoice.houseNumber}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t279
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t280
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t280 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t286
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderInvoice.zip} ${mailObj.orderInvoice.city}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                              <td>
                                                                                                                                                  <table
                                                                                                                                                      class=t289
                                                                                                                                                      role=presentation
                                                                                                                                                      cellpadding=0
                                                                                                                                                      cellspacing=0
                                                                                                                                                      align=center>
                                                                                                                                                      <tr>
                                                                                                                                                          <!--[if !mso]><!-->
                                                                                                                                                          <td class=t290
                                                                                                                                                              style="width:600px;">
                                                                                                                                                              <!--<![endif]-->
                                                                                                                                                              <!--[if mso]><td class=t290 style="width:600px;"><![endif]-->
                                                                                                                                                              <p class=t296
                                                                                                                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                                  ${mailObj.orderInvoice.country}
                                                                                                                                                              </p>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </table>
                                                                                                                                              </td>
                                                                                                                                          </tr>
                                                                                                                                      </table>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </div>
                                                                                              <!--[if mso]>
</td>
</tr></table>
<![endif]-->
                                                                                          </div>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <table class=t29 role=presentation cellpadding=0 cellspacing=0 align=center>
                                  <tr>
                                      <!--[if !mso]><!-->
                                      <td class=t30
                                          style="background-color:#242424;overflow:hidden;width:540px;padding:40px 30px 40px 30px;">
                                          <!--<![endif]-->
                                          <!--[if mso]><td class=t30 style="background-color:#242424;overflow:hidden;width:600px;padding:40px 30px 40px 30px;"><![endif]-->
                                          <table role=presentation width=100% cellpadding=0 cellspacing=0>
                                              <tr>
                                                  <td>
                                                      <table class=t43 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t44 style="width:600px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t44 style="width:600px;"><![endif]-->
                                                                  <p class=t50
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                      ${settings.company} | ${settings.street} ${settings.streetNumber} | ${settings.plz} ${settings.city}</p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <table class=t33 role=presentation cellpadding=0 cellspacing=0
                                                          align=center>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t34 style="width:600px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t34 style="width:600px;"><![endif]-->
                                                                  <p class=t40
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                      <a class=t64 href="http://localhost:3000/info/datenschutz"
                                                                      style="font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;"
                                                                      target=_blank>Datenschutz</a> • <a class=t65
                                                                      href="http://localhost:3000/info/kontakt"
                                                                      style="font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#878787;mso-line-height-rule:exactly;"
                                                                      target=_blank>Kontakt</a>
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </div>
</body>

</html>`;

  const mailOptions = {
    from: "danny.nothdurft@gmail.com",
    to: mailObj.orderShipping.email,
    subject: `Zahlungsaufforderung für Rechnung ${zweck}`,
    content: "Rechnung",
    html: emailContent,
    attachments: [
      {
        filename: "rechnung.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
