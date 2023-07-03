/* 
  Datei: get/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Aus dieser Route werden alle Artikel aus Datenbank abgerufen.
*/

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  await client.connect();
  const database = client.db("emcollectibles");
  const collection = database.collection("user");

  try {
    const reqBody = await request.json();
    const getUser = await collection.findOne({ email: reqBody.user });

    if (getUser) {
      const passwordsMached = await bcrypt.compare(
        reqBody.password,
        getUser.password
      );

      if (passwordsMached) {
        const dataToBeSentToFrontend = {
          _id: getUser._id,
          mail: getUser.mail,
          password: getUser.password,
          firstname: getUser.firstname,
          lastname: getUser.lastname,
          user: getUser.user,
        };

        const token = jwt.sign(dataToBeSentToFrontend, "AUTH", {
          expiresIn: 60 * 60,
        });

        const response = NextResponse.json({
          success: true,
          message: "User gefunden",
          data: token,
        });

        response.cookies.set("token", token, {
          httpOnly: true,
          path: "/",
          sameSite: "None",
          secure: true,
        });

        return response;
      } else if (!passwordsMached) {
        return NextResponse.json({
          success: false,
          message: "Bitte gib ein gültiges Password ein!",
        });
      }
    } else if (!getUser) {
      return NextResponse.json({
        success: false,
        message: "Gib als Benutzernamen eine gültige E-Mail-Adresse an!",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
