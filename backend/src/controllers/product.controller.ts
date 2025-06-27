import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getAllProducts, getProductsByCategory } from "@/services/getproduct";

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.body;
    console.log("Fetching products for category:", category);
    const products = await getProductsByCategory(category);
    res.json({ products: products });
  });
  
  export const getAll = asyncHandler(async (req: Request, res: Response) => {
    console.log("Fetching products:");
    const products = await getAllProducts();
    res.json({ products: products });
  });
  