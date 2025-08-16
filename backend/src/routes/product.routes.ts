import { Router } from "express";
import {
  getCategory,
  getAll,
  getProduct,
  searchProducts,
  getRelated,
  filterProducts,
} from "../controllers/product.controller";

const router = Router();

router.route("/all").get(getAll);
router.route("/search").get(searchProducts);
router.route("/category").post(getCategory);
router.route("/filter").post(filterProducts);
router.route("/:id/related").get(getRelated);
router.route("/:id").get(getProduct);

export default router;
