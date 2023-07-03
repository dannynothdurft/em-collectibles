/* 
  Datei: delete/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Löschen eines Artikels.
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
    const collection = database.collection("article");
    const deleteArticle = await collection.deleteOne({
      _id: new ObjectId(reqBody.id),
    });

    if (deleteArticle.acknowledged) {
      return NextResponse.json({
        success: true,
        message: "Artikel gelöscht",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
