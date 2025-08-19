import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/auth.middleware";
import asyncHandler from "express-async-handler";
import fs from "fs";

const router = Router();

// Use an absolute path to the uploads directory
const uploadDir = path.join(__dirname, "..", "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post(
  "/image",
  protect,
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    const filePath = `/public/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });

    return;
  })
);

export default router;
