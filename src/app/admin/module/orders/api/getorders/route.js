/* 
  Datei: getorders/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();

  try {
    const database = client.db("emcollectibles");
    const collection = database.collection("orders");
    const getOrders = await collection.find().toArray();

    return NextResponse.json({
      success: true,
      message: "Bestellungen gefunden",
      data: getOrders,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
