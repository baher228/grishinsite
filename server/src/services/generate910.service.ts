import fs from "fs/promises";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
const fontkit = require("fontkit");
import { Form910Data } from "../types";

export async function generate910Form(data: Form910Data): Promise<Buffer> {
  const formPath = path.resolve(__dirname, "../../assets/forms/910_blank.pdf");
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
    boxWidth = 15.05,
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
  /** 
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
*/
  drawText(data.iin, 104.5, 746.5);
  drawText(data.surname, 163, 720.3);
  drawText(data.name, 42.25, 698);
  if (data.fatherName) drawText(data.fatherName, 42.25, 676.7);
  drawText(data.taxPeriod, 409, 657.2);
  drawText(data.taxYear, 465.5, 657.2);

  if (data.accountingType === "A") drawText("X", 288, 620);
  if (data.accountingType === "B") drawText("X", 569, 620);

  // Плательщик единого платежа (X in checkbox)
  if (data.payerType) drawText("X", 289, 589);

  // Вид декларации (X in appropriate box)
  if (data.declarationType === "primary") drawText("X", 104.3, 551.5);
  if (data.declarationType === "additional") drawText("X", 260, 551.5);
  if (data.declarationType === "liquidation") drawText("X", 411, 551.5);

  // Трехкомпонентная интегрированная система
  if (data.integratedSystem) drawText("X", 387, 535);

  // Номер уведомления (8 boxes)
  if (data.notificationNumber) drawText(data.notificationNumber, 88.2, 493.8);

  // Дата уведомления (ДДММГГГГ, 8 boxes, numbers only)
  if (data.notificationDate)
    drawText(data.notificationDate.replace(/\D/g, ""), 471, 494, 14.1);

  // Код валюты (3 boxes)
  drawText(data.currencyCode, 88.8, 467.8);

  // Признак резидентства
  if (data.residency === "resident") drawText("X", 430, 466.5);
  if (data.residency === "nonresident") drawText("X", 400, 530);

  // --- MAIN CALCULATION SECTION ---

  drawTextRightToLeft(data.incomeCashless.toString(), 571, 402);
  drawTextRightToLeft(data.incomeECommerce.toString(), 571, 384);
  drawTextRightToLeft(data.avgEmployees.toString(), 571, 307);
  drawTextRightToLeft(data.avgSalary.toString(), 571, 244);
  drawTextRightToLeft(data.taxesCalculated.toString(), 571, 225);
  drawTextRightToLeft(data.taxesCorrected.toString(), 571, 203.5);
  drawTextRightToLeft(data.finalTax.toString(), 571, 184);

  // --- СОЦИАЛЬНЫЕ ОТЧИСЛЕНИЯ (по месяцам, 6 boxes) ---
  drawTextRightToLeft(data.monthsSocialPayments[0].toString(), 245.5, 73.5);
  drawTextRightToLeft(data.monthsSocialPayments[1].toString(), 245.5, 53.4);
  drawTextRightToLeft(data.monthsSocialPayments[2].toString(), 245.5, 33.3);
  drawTextRightToLeft(data.monthsSocialPayments[3].toString(), 569, 89.7);
  drawTextRightToLeft(data.monthsSocialPayments[4].toString(), 569, 69.6);
  drawTextRightToLeft(data.monthsSocialPayments[5].toString(), 569, 49.5);
  const socialPaymentsSum = data.monthsSocialPayments.reduce(
    (acc, val) => acc + val,
    0
  );
  drawTextRightToLeft(socialPaymentsSum.toString(), 569, 29.5);

  const pdfBytes = await pdfDoc.save();
  //await fs.writeFile(outputPath, pdfBytes);
  return Buffer.from(pdfBytes);
}
