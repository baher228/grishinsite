import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts as searchProductsService,
  getRelatedProducts as getRelatedProductsService,
  filterProducts as filterProductsService,
} from "../services/getproduct";
import {
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/setproduct";

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.body;
  console.log("Fetching products for category:", category);
  const products = await getProductsByCategory(category);
  res.json({ products: products });
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  console.log("Fetching products:");
  const products = await getAllProducts();
  res.json(products);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Fetching product with ID:", id);
  const product = await getProductById(parseInt(id));

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ product });
});

export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { q } = req.query;
    console.log("Searching products with query:", q);

    if (!q || typeof q !== "string") {
      res.status(400).json({ message: "Search query is required" });
      return;
    }

    const products = await searchProductsService(q);
    res.json({ products });
  }
);

export const getRelated = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Fetching related products for ID:", id);
  const products = await getRelatedProductsService(parseInt(id));
  res.json({ products });
});

export const filterProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { category, brand, minPrice, maxPrice, sortBy, sortOrder } = req.body;
    console.log("Filtering products with params:", req.body);

    const products = await filterProductsService({
      category,
      brand,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy: sortBy || "name",
      sortOrder: sortOrder || "asc",
    });

    res.json({ products });
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProductService(req.body);
    res.status(201).json({ product });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await updateProductService(parseInt(id), req.body);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ product });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProductService(parseInt(id));
    res.status(204).send();
  }
);
