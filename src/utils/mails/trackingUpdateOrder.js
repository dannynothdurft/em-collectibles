/* 
  Datei: OrderMail.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import nodemailer from "nodemailer";
import settings from "@/utils/settings.json";

module.exports = async (mailObj) => {
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
                                                                      Hallo ${mailObj.orderShipping.firstname},</h1>
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
                                                                      wir freuen uns, Dir mitteilen zu können, dass Deine
                                                                      Bestellung mit der Rechnungsnummer "${mailObj.billNumber}"
                                                                      erfolgreich verpackt wurde. Deine Bestellung ist nun bereit
                                                                      für den Versand und wird in Kürze auf dem Weg zu Dir sein.
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Wir haben der Sendung bereits eine Sendungsnummer zugewiesen, 
                                                                      mit der Du den Fortschritt Deiner Lieferung verfolgen kannst. Mit dieser Nummer kannst Du 
                                                                      über den Zustelldienst "DHL" die aktuelle Position deiner Sendung nachverfolgen.
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Die Sendungsnummer lautet: <a href="https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=${mailObj.trackingnumber}">${mailObj.trackingnumber}</a>. 
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Die Sendung wird bei der nächsten Abholung 
                                                                      von unserem Logistikpartner abgeholt und auf den 
                                                                      Weg zu Dir gebracht. Wir arbeiten eng mit unseren 
                                                                      Versandpartnern zusammen, um sicherzustellen, dass 
                                                                      Deine Bestellung so schnell wie möglich bei Dir ankommt.
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                          <!--[if !mso]><!-->
                                                          <td class=t66
                                                              style="width:580px;padding:0 10px 22px 10px;">
                                                              <!--<![endif]-->
                                                              <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                              <p class=t72
                                                                  style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                  Bitte beachte, dass es je nach Lieferadresse und Versandoption 
                                                                  zu geringfügigen Verzögerungen kommen kann. Solltest Du Fragen 
                                                                  zur Lieferung haben oder weitere Informationen benötigen, zögere 
                                                                  nicht, Dich mit unserem Kundenservice in Verbindung zu setzen. 
                                                                  Unser Team steht Dir gerne zur Verfügung und hilft Dir weiter.
                                                              </p>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                        <!--[if !mso]><!-->
                                                        <td class=t66
                                                            style="width:580px;padding:0 10px 22px 10px;">
                                                            <!--<![endif]-->
                                                            <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                            <p class=t72
                                                                style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                Wir möchten uns bei Dir für Dein Vertrauen und Deine Geduld bedanken. 
                                                                Wir sind zuversichtlich, dass Du mit Deiner Bestellung zufrieden sein wirst und stehen bereit, 
                                                                Dir ein großartiges Einkaufserlebnis zu bieten.
                                                            </p>
                                                        </td>
                                                      </tr>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Vielen Dank und bis bald!
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <!--[if !mso]><!-->
                                                              <td class=t66
                                                                  style="width:580px;padding:0 10px 22px 10px;">
                                                                  <!--<![endif]-->
                                                                  <!--[if mso]><td class=t66 style="width:600px;padding:0 10px 22px 10px;"><![endif]-->
                                                                  <p class=t72
                                                                      style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                      Liebe Grüße, <br />
                                                                      ${settings.company}
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
                                                                      ${settings.company} | ${settings.street}
                                                                      ${settings.streetNumber} | ${settings.plz}
                                                                      ${settings.city}</p>
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
                                                                      <a class=t64
                                                                          href="http://localhost:3000/info/datenschutz"
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
    subject: `Deine Bestellung wird Versendet`,
    content: "Bestellung wird versendet",
    html: emailContent,
  };

  await transporter.sendMail(mailOptions);
};
