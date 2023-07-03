/* 
  Datei: update/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Aktualliesieren/Hinzufügen der Bilder der Einstellungen.
*/

import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { MongoClient, ObjectId } from "mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collection = database.collection("settings");

  try {
    const reqBody = await request.json();

    const id = new ObjectId(reqBody.data._id);

    const images = Array.isArray(reqBody.img) ? reqBody.img : [reqBody.img];
    const uploadPromises = images.map((image) => {
      return cloudinary.uploader.upload(image, opts, {
        folder: reqBody.folder,
        public_id: id,
      });
    });

    const results = await Promise.all(uploadPromises);

    const success = results.every((result) => !!result);

    if (success) {
      const imageURLs = results.map((result) => result.secure_url);

      const updateSettings = await collection.updateOne(
        { _id: id },
        { $set: { logo: imageURLs[0] } }
      );

      return NextResponse.json({
        success: true,
        message: "Logo Aktuallisiert",
        data: imageURLs[0],
      });
    } else {
      console.error(
        "Ein oder mehrere Bilder konnten nicht hochgeladen werden."
      );
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
