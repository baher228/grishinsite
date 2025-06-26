import express from "express";
import multer from "multer";
import path from "path";
import { uploadPdfController } from "../controllers/upload.controller";
import { protectMiddleware } from "../middleware/protect.middleware";

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../../public/uploads"),
});

router.post("/", protectMiddleware, upload.single("file"), uploadPdfController);

export default router;
