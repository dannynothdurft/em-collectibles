/* 
  Datei: tobasker/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collection = database.collection("basketToken");

  try {
    const reqBody = await request.json();

    reqBody.newEntry._id = new ObjectId(reqBody.newEntry._id);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const document = {
      token: reqBody.newEntry,
      expiryDate: expiryDate,
    };

    await collection.insertOne(document);

    return NextResponse.json({
      success: true,
      message: "Token erfolgreich erstellt",
      data: document,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
