import express from "express";
import { notFound, errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";

import productRouter from "./routes/product.routes";
import authRouter from "./routes/auth.routes";
import uploadRouter from "./routes/upload.routes";
import path from "path";
import fs from "fs";

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
const cors = require("cors");

// Resolve project root (when compiled, __dirname is backend/dist)
const ROOT_DIR = path.resolve(__dirname, "..");

// Filesystem directory where images are stored (matches your repo layout)
const UPLOADS_DIR = path.join(ROOT_DIR, "public", "uploads");

// Ensure upload directory exists at runtime
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

async function main() {
  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: false }));

  // CORS
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

  // Static: serve everything under backend/public at /public (unchanged)
  app.use("/public", express.static(path.join(ROOT_DIR, "public")));

  // Static: serve uploaded files at URL /uploads/... (this is the important addition)
  app.use(
    "/uploads",
    express.static(UPLOADS_DIR, {
      fallthrough: false,
      etag: true,
      maxAge: "30d",
      index: false,
    })
  );

  // API routes
  app.use("/api/products", productRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/upload", uploadRouter); // POST /api/upload/image should save into public/uploads

  // 404 + error handlers
  app.use(notFound);
  app.use(errorHandler);

  // Start server
  const PORT = Number(process.env.PORT || 4200);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving uploads from: ${UPLOADS_DIR} at URL /uploads`);
  });
}

main();
