import { Router } from "express";
import { getCategory, getAll } from "../controllers/product.controller";

const router = Router();

router.route("/category").post(getCategory);
router.route("/all").get(getAll);

export default router;
