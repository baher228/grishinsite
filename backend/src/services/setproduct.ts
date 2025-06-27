import { db } from '../db';

export async function setPriceByName(name: string, price: number): Promise<void> {
    await db.query(`UPDATE products SET price = $1 WHERE name = $2`, [price, name]);
  }
  
  export async function setPriceById(id: number, price: number): Promise<void> {
    await db.query(`UPDATE products SET price = $1 WHERE id = $2`, [price, id]);
  }
  