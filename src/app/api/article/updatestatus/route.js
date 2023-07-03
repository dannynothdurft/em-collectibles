/* 
  Datei: updatestatus/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  try {
    const reqBody = await request.json();

    const database = client.db("emcollectibles");
    const collection = database.collection("basketToken");

    const updateStatus = await collection.deleteOne({
      "token._id": new ObjectId(reqBody.newEntry._id),
    });

    if (updateStatus) {
      return NextResponse.json({
        success: true,
        message: "Token gelöscht",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
