/* 
  Datei: get/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Aus dieser Route werden alle Einstellungen der Datenbank abgerufen.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();

  try {
    const database = client.db("emcollectibles");
    const collection = database.collection("settings");
    const getSettings = await collection.findOne();

    return NextResponse.json({
      success: true,
      message: "Einstellungen gefunden",
      data: getSettings,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
