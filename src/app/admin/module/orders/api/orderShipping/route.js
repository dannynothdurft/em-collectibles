/*
  Datei: orderShipping/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import trackingUpdateOrder from "@/utils/mails/trackingUpdateOrder";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collection = database.collection("orders");

  try {
    const reqBody = await request.json();
    const id = new ObjectId(reqBody.activeOrder._id);

    const getOrder = await collection.updateOne(
      { _id: id },
      {
        $set: {
          orderStatus: "Bestellung wurde versendet",
          trackingnumber: reqBody.trackingnumber,
        },
      }
    );

    if (getOrder.acknowledged) {
      const updatedOrder = await collection.findOne({ _id: id });

      await trackingUpdateOrder(updatedOrder);

      return NextResponse.json({
        success: true,
        message: "Sendungsnummer Aktuallisiert",
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
