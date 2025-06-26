import fs from "fs/promises";
import pdfParse from "pdf-parse";
import { Transaction, Form910Data } from "../types";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import { generate910Form } from "./generate910.service";

dotenv.config({ path: ".env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const classificationCache = new Map<string, boolean>();

async function classifyTransactionWithGPT(details: string): Promise<boolean> {
  if (classificationCache.has(details))
    return classificationCache.get(details)!;

  const prompt = `You are an assistant for a sole trader analyzing bank transactions. Is the following transaction related to business activity (like selling goods/services, business rent, utilities, etc)? Respond ONLY with "Yes" or "No".\n\nTransaction: "${details}"`;

  try {
    console.log("Sending prompt to GPT:", prompt); // Log the prompt being sent

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    //console.log("GPT response:", response); // Log the full GPT response

    const answer = response.choices[0].message?.content?.toLowerCase().trim();
    console.log("Parsed GPT answer:", answer); // Log the parsed answer

    const isBusiness = answer === "yes";
    classificationCache.set(details, isBusiness);
    return isBusiness;
  } catch (err) {
    console.error("GPT error:", err); // Log any errors from GPT
    return false;
  }
}

function isPersonalTransaction(details: string): boolean {
  const personalKeywords = [
    "withdrawal",
    "cash",
    "salary",
    "salary payment",
    "transfer",
    "payment",
    "utilities",
    "rent",
    "ресторан",
    "путешествие",
    "магазин",
    "личный",
  ];
  const detailsLower = details.toLowerCase();
  return personalKeywords.some((keyword) => detailsLower.includes(keyword));
}

function isSureBusinessTransaction(details: string): boolean {
  const businessKeywords = [
    "invoice",
    "client",
    "consulting",
    "kaspi.kz",
    "freelance",
    "terminal",
    "merchant",
    "b2b",
    "зачисление",
    "перевод",
    "sales",
    "платеж",
    "счет",
    "чек",
    "клиент",
    "клиента",
    "услуга",
    "услуги",
    "касса",
    "покупатель",
    "поставщик",
  ];
  const detailsLower = details.toLowerCase();
  return businessKeywords.some((keyword) => detailsLower.includes(keyword));
}

export async function processPdfFile(
  filePath: string,
  userData: Partial<Form910Data>
): Promise<Buffer> {
  const fileBuffer = await fs.readFile(filePath);
  const pdfData = await pdfParse(fileBuffer);

  const lines = pdfData.text.split("\n").map((line) => line.trim());
  const transactions: Transaction[] = [];
  // Updated regex to match the actual format of the lines
  const transactionRegex = /^(\d{2}\.\d{2}\.\d{4})([^\d]+)([\d,]+)$/;

  for (const line of lines) {
    if (!line) continue;

    const match = line.match(transactionRegex);
    if (match) {
      const [, date, details, amountStr] = match;
      const amount = parseFloat(amountStr.replace(/,/g, "").replace("₸", ""));
      if (isNaN(amount) || amount === 0) continue;

      transactions.push({ date, amount, type: "", details });
    } else {
      console.log("No match for line:", line);
    }
  }

  console.log("Parsed transactions:", transactions);
  const nonPersonalTransactions = transactions.filter(
    (tx) => !isPersonalTransaction(tx.details)
  );

  console.log("Non-personal transactions:", nonPersonalTransactions);
  const sureBusinessTransactions: Transaction[] = [];
  const notSureTransactions: Transaction[] = [];

  for (const tx of nonPersonalTransactions) {
    if (isSureBusinessTransaction(tx.details)) {
      sureBusinessTransactions.push(tx);
    } else {
      notSureTransactions.push(tx);
    }
  }

  console.log("Sure business transactions:", sureBusinessTransactions);
  console.log("Not sure transactions:", notSureTransactions);

  // Step 3: Use GPT to classify "not sure" transactions
  for (const tx of notSureTransactions) {
    const isBusiness = await classifyTransactionWithGPT(tx.details);
    if (isBusiness) sureBusinessTransactions.push(tx);
  }

  // Step 4: Calculate the total for business transactions
  const totalBusinessAmount = sureBusinessTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const roundedBusinessTotal = parseFloat(totalBusinessAmount.toFixed(2));
  console.log("Total Business Amount:", roundedBusinessTotal);
  const formData: Form910Data = {
    iin: userData.iin || "000000000000",
    surname: userData.surname || "Фамилия",
    name: userData.name || "Имя",
    fatherName: userData.fatherName || "Отчество",
    taxPeriod: userData.taxPeriod || "1",
    taxYear: userData.taxYear || "2024",
    accountingType: userData.accountingType || "B",
    payerType: userData.payerType ?? true,
    declarationType: userData.declarationType || "primary",
    integratedSystem: userData.integratedSystem ?? true,
    notificationNumber: userData.notificationNumber || "",
    notificationDate: userData.notificationDate || "",
    currencyCode: userData.currencyCode || "398",
    residency: userData.residency || "resident",
    incomeCashless: roundedBusinessTotal,
    incomeECommerce: 0,
    avgEmployees: 0,
    avgSalary: 0,
    taxesCalculated: 0,
    taxesCorrected: 0,
    finalTax: 0,
    monthsSocialPayments: [0, 0, 0, 0, 0, 0],
  };

  const pdfBuffer = await generate910Form(formData);
  return pdfBuffer;
}
