import express from "express";
import { notFound, errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";

const app = express();
const cors = require("cors");

async function main() {
  app.use(
    cors({
      allow_origins: ["http://localhost:3000", "https://feronova.co.uk/"],
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/api/products", productRouter);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(process.env.PORT || 4200, () => {
    console.log("Server is running on port 4200");
  });
}

main();
