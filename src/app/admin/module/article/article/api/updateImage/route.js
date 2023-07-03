/* 
  Datei: updateImage/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Aktualliesieren/Hinzufügen der Bilder eines Artikels.
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
  const collection = database.collection("article");

  try {
    const reqBody = await request.json();

    const articleId = new ObjectId(reqBody.article._id);
    const existingArticle = await collection.findOne({ _id: articleId });
    const existingImages = existingArticle.images || [];
    const arrayLength = existingImages.length;

    const images = Array.isArray(reqBody.img) ? reqBody.img : [reqBody.img];
    const uploadPromises = images.map((image, index) => {
      return cloudinary.uploader.upload(image, opts, {
        folder: reqBody.folder,
        public_id: `${new ObjectId(reqBody.article._id)}_${
          arrayLength + (index + 1)
        }`,
      });
    });

    const results = await Promise.all(uploadPromises);

    const success = results.every((result) => !!result);

    if (success) {
      const imageURLs = results.map((result) => result.secure_url);
      const updatedImages = existingImages.concat(imageURLs);

      const updateProduct = await collection.updateOne(
        { _id: articleId },
        { $set: { images: updatedImages } }
      );

      return NextResponse.json({
        success: true,
        message: "Bilder Hochgeladen",
        data: updatedImages,
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
