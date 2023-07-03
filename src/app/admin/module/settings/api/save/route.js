/* 
  Datei: save/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Speichern und Aktuallisieren der Einstellungen.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import settingsSchema from "../../models/settingsSchema";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  try {
    const reqBody = await request.json();

    const database = client.db("emcollectibles");
    const collection = database.collection("settings");

    // Löschen der vorhandenen Einstellungen
    await collection.deleteMany({});

    const newDocument = new settingsSchema(reqBody);
    const postSettings = await collection.insertOne(newDocument);

    if (postSettings.acknowledged) {
      return NextResponse.json({
        success: true,
        message: "Einstellung gespeichert",
        data: newDocument,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
