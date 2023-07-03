/* 
  Datei: deleteImage/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Aktualliesieren/Entfernen der Bilder eines Artikels.
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

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collection = database.collection("article");

  try {
    const reqBody = await request.json();

    const articleId = new ObjectId(reqBody.article._id);

    const deleteImageFromCloud = await cloudinary.uploader.destroy(
      `${reqBody.folder}/${reqBody.public_id}`,
      (error, result) => {
        return result;
      }
    );

    if (deleteImageFromCloud.result === "ok") {
      const article = await collection.findOne({ _id: articleId });

      if (article) {
        const updatedImages = article.images.filter(
          (image) => image !== reqBody.img
        );

        await collection.updateOne(
          { _id: articleId },
          { $set: { images: updatedImages } }
        );

        return NextResponse.json({
          success: true,
          message: "Bild gelöscht",
          data: updatedImages,
        });
      } else {
        return NextResponse.json({ message: error }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
