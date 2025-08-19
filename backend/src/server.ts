import express from "express";
import { notFound, errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
import authRouter from "./routes/auth.routes";
import uploadRouter from "./routes/upload.routes";
import path from "path";

dotenv.config();

const app = express();
const cors = require("cors");

async function main() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://feronova.co.uk",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );
  app.use(express.json());

  app.use("/public", express.static(path.join(__dirname, "../public")));

  app.use("/api/products", productRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/upload", uploadRouter);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(process.env.PORT || 4200, () => {
    console.log("Server is running on port 4200");
  });
}

main();
