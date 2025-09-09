import { db } from "../db";

import { Product } from "../types/product.props";

export const createProduct = async (product: Omit<Product, "id">) => {
  const { name, brand, description, price, image, category, stock } = product;
  const result = await db.query(
    "INSERT INTO products (name, brand, description, price, image, category, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",

    [name, brand, description, price, image, category, stock]
  );
  return result.rows[0];
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
  const { name, brand, description, price, image, category, stock } = product;
  const result = await db.query(
    "UPDATE products SET name = $1, brand = $2, description = $3, price = $4, image = $5, category = $6, stock = $7 WHERE id = $8 RETURNING *",

    [name, brand, description, price, image, category, stock, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id: number) => {
  await db.query("DELETE FROM products WHERE id = $1", [id]);
};
