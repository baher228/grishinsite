import path from "path";
import { generate220Form } from "./generate220.service";
import { Form220Data } from "@/types";

const exampleData: Form220Data = {
  iin: "930101300123",
  year: "2023",
  surname: "Иванов",
  name: "Иван",
  fatherName: "Иванович",
  declarationType: "liquidation",
  numberOfRequet: "REQ-2023-001",
  dateOfRequet: "2023-04-15",
  taxpayerType: "A",
  MFCA: "",
  currency: "KZT",
  additionalDocuments: "Документ1, Документ2",
  resident: true,
  residentCountry: "Казахстан",
  taxpayerNumber: "123456789",
  realisedPnL: "1500000",
  profitFromCrediting: "50000",
  profitFromProperty: "20000",
  profitFromRoyalty: "10000",
  profitFromRenting: "30000",
  profitFromPriceDifference: "25000",
  profitFromDecreaseOfAdministrativeValue: "5000"
};

async function run() {
  // Output path: put in /output/ folder (create it if missing!)
  const outputPath = path.resolve(__dirname, "./filled_220_example.pdf");

  try {
    await generate220Form(exampleData, outputPath);
    console.log("Form 220 successfully filled and saved to:", outputPath);
  } catch (error) {
    console.error("Error filling 220 form:", error);
  }
}

run();
