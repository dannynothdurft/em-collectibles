/* 
  Datei: start/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: In dieser route wird die erste Abfrage getätigt um alle activen Produkte und Shop Einstellungen zu bekommen.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collectionArticle = database.collection("article");
  const collectionSettings = database.collection("settings");
  const collectionToken = database.collection("basketToken");

  try {
    const getActiveArticels = await collectionArticle
      .find({
        active: "Ja",
        _id: { $nin: await collectionToken.distinct("token._id") },
      })
      .toArray();
    const getShopSettings = await collectionSettings.findOne();

    if (getActiveArticels && getShopSettings) {
      return NextResponse.json({
        success: true,
        message: "Artikel & Settings gefunden",
        data: {
          activeArticles: getActiveArticels,
          shopSettings: getShopSettings,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Artikel & Settings nicht gefunden",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
