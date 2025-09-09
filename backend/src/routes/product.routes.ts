import { Router } from "express";
import {
  getCategory,
  getAll,
  getProduct,
  searchProducts,
  getRelated,
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.route("/").post(protect, createProduct);
router.route("/all").get(getAll);

router.route("/search").get(searchProducts);
router.route("/category").post(getCategory);
router.route("/filter").post(filterProducts);
router.route("/:id/related").get(getRelated);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
