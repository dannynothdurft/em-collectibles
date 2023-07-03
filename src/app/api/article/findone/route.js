/* 
  Datei: findone/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung:
*/

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  try {
    const reqBody = await request.json();
    const id = new ObjectId(reqBody.id);

    const database = client.db("emcollectibles");
    const collection = database.collection("article");
    const getArticel = await collection.findOne({ _id: id });

    if (getArticel) {
      return NextResponse.json({
        success: true,
        message: "Artikel Gefunden",
        article: getArticel,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
