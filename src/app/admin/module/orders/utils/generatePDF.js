// Separate Datei: generatePDF.js

import puppeteer from "puppeteer";

export async function generatePDF(htmlTemplate) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlTemplate);
  const pdfBuffer = await page.pdf({ format: "A4" });

  return pdfBuffer;
}
