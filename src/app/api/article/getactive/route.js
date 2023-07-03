/* 
  Datei: getactive/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Aus dieser Route werden alle Artikel aus Datenbank abgerufen die den Status Aktive haben.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request) {
  await client.connect();

  try {
    const database = client.db("emcollectibles");
    const collection = database.collection("article");
    const getArticels = await collection.find({ active: "Ja" }).toArray();

    return NextResponse.json({
      success: true,
      message: "Artikel Gefunden",
      data: getArticels,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
