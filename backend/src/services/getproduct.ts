import { db } from '../db';
import { Product } from '../types/product.props';

export async function getProductById (id: number): Promise<Product> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function getProductByName (name: string): Promise<Product> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE name = $1`,
    [name]
  );
  return result.rows[0];
}

export async function getAllProducts (): Promise<Product[]> {
  const result = await db.query<Product>(
    `SELECT * FROM products`
  );
  return result.rows;
}

export async function getProductsByCategory (category: string): Promise<Product[]> {
  const result = await db.query<Product>(
    `SELECT * FROM products WHERE category = $1`,
    [category]
  );
  return result.rows;
}