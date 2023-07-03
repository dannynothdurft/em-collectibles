/* 
  Datei: get-user-info/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
*/

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const reqBody = await request.json();
  const token = reqBody.headers.Authorization;
  try {
    const user = jwt.verify(token, "AUTH");

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Korrekt",
        data: user,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Nöp",
    });
  }
}
