/* 
  Datei: update/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Aktualliesieren eines Artikels.
*/

import { MongoClient, ObjectId } from "mongodb";
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
    const updateSchema = new articleSchema(reqBody);
    const updateArticle = await collection.updateOne(
      { _id: new ObjectId(reqBody._id) },
      {
        $set: {
          active: updateSchema.active,
          name: updateSchema.name,
          cardNumber: updateSchema.cardNumber,
          type: updateSchema.type,
          holo: updateSchema.holo,
          firstEdition: updateSchema.firstEdition,
          rarityLevel: updateSchema.rarityLevel,
          set: updateSchema.set,
          year: updateSchema.year,
          bgc: updateSchema.bgc,
          language: updateSchema.language,
          grading: updateSchema.grading,
          gradingCompany: updateSchema.gradingCompany,
          gradingScale: updateSchema.gradingScale,
          certificateNumber: updateSchema.certificateNumber,
          evaluation: updateSchema.evaluation,
          description: updateSchema.description,
          quantity: updateSchema.quantity,
          price: updateSchema.price,
        },
      }
    );

    if (updateArticle) {
      return NextResponse.json({
        success: true,
        message: "Artikel gespeichert",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
