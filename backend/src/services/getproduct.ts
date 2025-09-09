import { db } from "../db";
import { Product } from "../types/product.props";

export interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getProductById(id: number): Promise<Product | null> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function getProductByName(name: string): Promise<Product | null> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE name = $1`,
    [name]
  );
  return result.rows[0] || null;
}

export async function getAllProducts(): Promise<Product[]> {
  const result = await db.query<Product>(
    `SELECT * FROM products ORDER BY name ASC`
  );
  return result.rows;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE category = $1 ORDER BY name ASC`,
    [category]
  );
  return result.rows;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const result = await db.query<Product>(
    `SELECT * FROM products 
     WHERE name ILIKE $1 OR description ILIKE $1 OR brand ILIKE $1
     ORDER BY name ASC`,
    [`%${query}%`]
  );
  return result.rows;
}

export async function getRelatedProducts(
  productId: number
): Promise<Product[]> {
  const product = await getProductById(productId);
  if (!product) {
    return [];
  }

  const result = await db.query<Product>(
    `SELECT * FROM products 
     WHERE category = $1 AND id != $2 
     ORDER BY RANDOM() 
     LIMIT 4`,
    [product.category, productId]
  );
  return result.rows;
}

export async function filterProducts(
  options: FilterOptions
): Promise<Product[]> {
  let query = `SELECT * FROM products WHERE 1=1`;
  const params: any[] = [];
  let paramIndex = 1;

  if (options.category) {
    query += ` AND category = $${paramIndex}`;
    params.push(options.category);
    paramIndex++;
  }

  if (options.brand) {
    query += ` AND brand = $${paramIndex}`;
    params.push(options.brand);
    paramIndex++;
  }

  if (options.minPrice !== undefined) {
    query += ` AND price >= $${paramIndex}`;
    params.push(options.minPrice);
    paramIndex++;
  }

  if (options.maxPrice !== undefined) {
    query += ` AND price <= $${paramIndex}`;
    params.push(options.maxPrice);
    paramIndex++;
  }

  const validSortColumns = ["name", "price", "brand"];
  const sortBy = validSortColumns.includes(options.sortBy || "")
    ? options.sortBy
    : "name";
  const sortOrder = options.sortOrder === "desc" ? "DESC" : "ASC";

  query += ` ORDER BY ${sortBy} ${sortOrder}`;

  const result = await db.query<Product>(query, params);
  return result.rows;
}
