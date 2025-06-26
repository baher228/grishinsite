import fs from "fs/promises";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
const fontkit = require("fontkit");
import { Form220Data } from "../types";

export async function generate220Form(data: Form220Data, outputPath: string): Promise<Buffer> {
  const formPath = path.resolve(__dirname, "../../assets/forms/220_blank.pdf");
  const fontPath = path.resolve(
    __dirname,
    "../../assets/fonts/NotoSans-Regular.ttf"
  );
  const formBytes = await fs.readFile(formPath);
  const fontBytes = await fs.readFile(fontPath);
  const pdfDoc = await PDFDocument.load(formBytes);
  pdfDoc.registerFontkit(fontkit);
  const page = pdfDoc.getPages()[0];
  const font = await pdfDoc.embedFont(fontBytes);

  function drawText(
    text: string,
    x: number,
    y: number,
    boxWidth = 14.53,
    size = 12,
    color = rgb(0, 0, 0)
  ) {
    for (let i = 0; i < text.length; i++) {
      page.drawText(text[i], {
        x: x + i * boxWidth,
        y: y,
        size,
        font,
        color,
      });
    }
  }

  function drawTextRightToLeft(
    text: string,
    xRight: number,
    y: number,
    boxWidth = 15.05,
    size = 12,
    color = rgb(0, 0, 0)
  ) {
    for (let i = 0; i < text.length; i++) {
      page.drawText(text[text.length - 1 - i], {
        x: xRight - i * boxWidth,
        y: y,
        size,
        font,
        color,
      });
    }
  }
  
  for (let x = 0; x <= 650; x += 10) {
    page.drawLine({
      start: { x, y: 0 },
      end: { x, y: 800 },
      thickness: x % 50 === 0 ? 0.7 : 0.3,
      color: rgb(1, 0, 0),
      opacity: x % 50 === 0 ? 0.7 : 0.3,
    });
    if (x % 50 === 0) {
      page.drawText(`${x}`, { x: x + 2, y: 795, size: 7, color: rgb(1, 0, 0) });
    }
  }

  for (let y = 0; y <= 800; y += 10) {
    page.drawLine({
      start: { x: 0, y },
      end: { x: 650, y },
      thickness: y % 50 === 0 ? 0.7 : 0.3,
      color: rgb(0, 0, 1),
      opacity: y % 50 === 0 ? 0.7 : 0.3,
    });
    if (y % 50 === 0) {
      page.drawText(`${y}`, { x: 3, y: y + 2, size: 7, color: rgb(0, 0, 1) });
    }
  }

  // --- Draw main fields ---
  drawText(data.iin, 72, 706.5);
  drawText(data.year, 362, 687.5);
  drawText(data.surname, 134, 666);
  drawText(data.name, 47.25, 645);
  if (data.fatherName) drawText(data.fatherName, 47.25, 625.7);
  

  // Declaration type (first/second/additional/additionalByRequest/liquidation)
  if (data.declarationType === "first") drawText("X", 106.5, 594.5);
  if (data.declarationType === "regular") drawText("X", 180, 594.5);
  if (data.declarationType === "additional") drawText("X", 281.5, 595.5);
  if (data.declarationType === "additionalByRequest") drawText("X", 387.7, 595.5);
  if (data.declarationType === "liquidation") drawText("X", 494, 595.5);

  // Number of request
  if (data.numberOfRequet) drawText(data.numberOfRequet, 163, 656.5);

  // Date of request (YYYY-MM-DD)
  if (data.dateOfRequet) drawText(data.dateOfRequet, 350, 656.5);

  // Taxpayer type (A/B/C)
  if (data.taxpayerType === "A") drawText("X", 42.5, 636.5);
  if (data.taxpayerType === "B") drawText("X", 74.5, 636.5);

  // MFCA
  if (data.MFCA) drawText(data.MFCA, 163, 636.5);

  // Currency
  if (data.currency) drawText(data.currency, 350, 636.5);

  // Additional documents
  if (data.additionalDocuments) drawText(data.additionalDocuments, 42.25, 616.5);

  // Resident checkbox
  if (data.resident) drawText("X", 42.5, 596.5);

  // Resident country
  if (data.residentCountry) drawText(data.residentCountry, 163, 596.5);

  // Taxpayer number
  if (data.taxpayerNumber) drawText(data.taxpayerNumber, 350, 596.5);

  // Realised PnL
  if (data.realisedPnL) drawTextRightToLeft(data.realisedPnL, 610, 576.5);

  // Profit from crediting
  if (data.profitFromCrediting) drawTextRightToLeft(data.profitFromCrediting, 610, 556.5);

  // Profit from property
  if (data.profitFromProperty) drawTextRightToLeft(data.profitFromProperty, 610, 536.5);

  // Profit from royalty
  if (data.profitFromRoyalty) drawTextRightToLeft(data.profitFromRoyalty, 610, 516.5);

  // Profit from renting
  if (data.profitFromRenting) drawTextRightToLeft(data.profitFromRenting, 610, 496.5);

  // Profit from price difference
  if (data.profitFromPriceDifference) drawTextRightToLeft(data.profitFromPriceDifference, 610, 476.5);

  // Profit from decrease of administrative value
  if (data.profitFromDecreaseOfAdministrativeValue) drawTextRightToLeft(data.profitFromDecreaseOfAdministrativeValue, 610, 456.5);

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
  return Buffer.from(pdfBytes);
}
