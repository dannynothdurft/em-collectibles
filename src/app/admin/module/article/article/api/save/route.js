/* 
  Datei: save/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Speichern und Aktuallisieren der Artikel.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import articleSchema from "../../models/articleSchema";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  try {
    const reqBody = await request.json();

    const database = client.db("emcollectibles");
    const collection = database.collection("article");
    const newDocument = new articleSchema(reqBody);
    const postArticle = await collection.insertOne(newDocument);

    if (postArticle.acknowledged) {
      return NextResponse.json({
        success: true,
        message: "Artikel angelegt",
        data: newDocument,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
