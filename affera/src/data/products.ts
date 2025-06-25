import { Product } from '../components/product/ProductCard';

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Professional Drill Set - 18V Cordless",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    brand: "PowerTech",
    category: "tools"
  },
  {
    id: 2,
    name: "Adjustable Wrench Set - Chrome Vanadium",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1609205264511-b0b2b7b7b7b7?w=400&h=300&fit=crop",
    brand: "CraftMaster",
    category: "tools"
  },
  {
    id: 3,
    name: "Copper Pipe Fitting Kit - 1/2 inch",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    brand: "PlumbPro",
    category: "plumbing"
  },
  {
    id: 4,
    name: "Heavy Duty Hammer - 16oz Steel",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1609205264511-b0b2b7b7b7b7?w=400&h=300&fit=crop",
    brand: "BuildRight",
    category: "construction"
  },
  {
    id: 5,
    name: "PVC Pipe Cutter - Professional Grade",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    brand: "PlumbPro",
    category: "plumbing"
  },
  {
    id: 6,
    name: "Circular Saw - 7.25 inch Blade",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    brand: "PowerTech",
    category: "tools"
  },
  {
    id: 7,
    name: "Toilet Flange Repair Kit",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    brand: "FixIt",
    category: "plumbing"
  },
  {
    id: 8,
    name: "Construction Level - 48 inch",
    price: 67.99,
    originalPrice: 84.99,
    image: "https://images.unsplash.com/photo-1609205264511-b0b2b7b7b7b7?w=400&h=300&fit=crop",
    brand: "BuildRight",
    category: "construction"
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.slice(0, 4);
};
