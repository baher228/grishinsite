export interface Product {
  id: number;
  name: string;
  brand: string | undefined;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}
