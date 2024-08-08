/* 
  Datei: orderbasket/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import orderMail from "@/utils/mails/orderMail";
import orderMailPayPal from "@/utils/mails/orderMailPayPal";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();

  try {
    const reqBody = await request.json();

    const database = client.db("emcollectibles");
    const colArticle = database.collection("article");
    const colOrders = database.collection("orders");
    const colSettings = database.collection("settings");
    const colToken = database.collection("basketToken");

    const getSettings = await colSettings.findOne();
    const billNumber = getSettings.billNumber;
    const billCrurrentNumber =
      "EM-R-2024-" + billNumber.toString().padStart(4, "0");

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let date = day + "." + month + "." + year;

    let orderStatus;

    if (reqBody.payment === "Vorkasse") {
      orderStatus = "Bestellung Eingegangen";
    }
    if (reqBody.payment === "PayPal") {
      orderStatus = "Bestellung Bezahlt";
    }

    let invoice;

    if (reqBody.invoice) {
      invoice = reqBody.invoice;
    } else {
      invoice = reqBody.shipping;
    }

    let objectOrder = {
      billNumber: billCrurrentNumber,
      orderDate: date,
      orderPayment: reqBody.payment,
      orderStatus: orderStatus,
      orderAmount: reqBody.orderPrice.toFixed(2),
      orderShipping: reqBody.shipping,
      orderInvoice: invoice,
      orderFullName: `${invoice.firstname} ${invoice.lastname}`,
      orderBasket: reqBody.basket,
    };

    const postOrder = await colOrders.insertOne(objectOrder);

    if (postOrder.acknowledged) {
      // Schleife über jeden Eintrag im Warenkorb
      for (const item of reqBody.basket) {
        const article = await colArticle.findOne({
          _id: new ObjectId(item._id),
        });

        if (article) {
          // Aktualisiere die quantity
          await colArticle.updateOne(
            { _id: new ObjectId(item._id) },
            { $inc: { quantity: -item.quantity } }
          );

          // Wenn der Bestand weniger als 0 ist wird er Offline genommen
          if (article.quantity - item.quantity <= 0) {
            await colArticle.updateOne(
              { _id: new ObjectId(item._id) },
              { $set: { active: "Nein" } }
            );
          }

          await colSettings.updateOne({}, { $inc: { billNumber: +1 } });

          await colToken.deleteOne({
            "token._id": new ObjectId(item._id),
          });
        }
      }

      if (reqBody.payment === "Vorkasse") {
        await orderMail(objectOrder, billCrurrentNumber);
      }

      if (reqBody.payment === "PayPal") {
        await orderMailPayPal(
          reqBody,
          `Rechnung: ${billCrurrentNumber}`,
          billCrurrentNumber
        );
      }

      return NextResponse.json({
        success: true,
        message: "Bestellung Erfolgreich gesendet",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
