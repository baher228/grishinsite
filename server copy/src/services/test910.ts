import path from "path";
import { generate910Form } from "./generate910.service";
import { Form910Data } from "@/types";

const exampleData: Form910Data = {
  iin: "930101300123",
  fullname: "Иванов Иван Иванович",
  taxPeriod: "1",
  taxYear: "2024",
  accountingType: "B", // strictly matches "A" | "B"
  payerType: true,
  declarationType: "primary", // strictly matches "primary" | "additional" | "liquidation"
  integratedSystem: true,
  notificationNumber: "123456",
  notificationDate: "15/07/2024",
  currencyCode: "398",
  residency: "resident", // strictly matches "resident" | "nonresident"
  incomeCashless: 2500000,
  incomeECommerce: 0,
  avgEmployees: 4,
  avgSalary: 180000,
  taxesCalculated: 96000,
  taxesCorrected: 0,
  finalTax: 96000,
  monthsSocialPayments: [10500, 10500, 10500, 10500, 10500, 10500],
};

async function run() {
  // Output path: put in /output/ folder (create it if missing!)
  const outputPath = path.resolve(__dirname, "./filled_910_example.pdf");

  try {
    await generate910Form(exampleData, outputPath);
    console.log("Form 910 successfully filled and saved to:", outputPath);
  } catch (error) {
    console.error("Error filling 910 form:", error);
  }
}

run();
