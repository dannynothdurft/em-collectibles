/* 
  Datei: pushContactForm/route.js
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Route enthält das Versenden des Kontakt Formulars der Shop-Anwendung.
*/

import { NextResponse } from "next/server";
import contactForm from "@/utils/mails/contactForm";

export async function POST(request) {
  try {
    const reqBody = await request.json();

    await contactForm(reqBody, `KF: ${reqBody.subject}`);

    return NextResponse.json({
      success: true,
      message: "E-Mail wurde erfolgreich versendet",
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
