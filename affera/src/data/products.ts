import { Product } from '../components/product/ProductCard';

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Professional Drill Set - 18V Cordless",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    brand: "PowerTech",
    category: "tools",
    description: "High-performance cordless drill with 18V battery and complete bit set.",
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Adjustable Wrench Set - Chrome Vanadium",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    brand: "CraftMaster",
    category: "tools",
    description: "Professional grade adjustable wrench set with chrome vanadium steel construction.",
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "Copper Pipe Fitting Kit - 1/2 inch",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    brand: "PlumbPro",
    category: "plumbing",
    description: "Complete copper pipe fitting kit with elbows, tees, and couplings.",
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: 4,
    name: "Heavy Duty Hammer - 16oz Steel",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=300&fit=crop",
    brand: "BuildRight",
    category: "construction",
    description: "Professional 16oz steel hammer with ergonomic grip and balanced design.",
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 5,
    name: "PVC Pipe Cutter - Professional Grade",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    brand: "PlumbPro",
    category: "plumbing",
    description: "Heavy-duty PVC pipe cutter for pipes up to 2 inches in diameter.",
    inStock: true,
    rating: 4.4,
    reviews: 92
  },
  {
    id: 6,
    name: "Circular Saw - 7.25 inch Blade",
    price: 179.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    brand: "PowerTech",
    category: "tools",
    description: "Professional circular saw with 7.25\" carbide blade and laser guide.",
    inStock: true,
    rating: 4.8,
    reviews: 203
  },
  {
    id: 7,
    name: "Toilet Flange Repair Kit",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
    brand: "FixIt",
    category: "plumbing",
    description: "Complete toilet flange repair kit with wax ring and mounting hardware.",
    inStock: true,
    rating: 4.2,
    reviews: 45
  },
  {
    id: 8,
    name: "Construction Level - 48 inch",
    price: 67.99,
    originalPrice: 84.99,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop",
    brand: "BuildRight",
    category: "construction",
    description: "Professional 48-inch level with magnetic base and high-visibility vials.",
    inStock: true,
    rating: 4.5,
    reviews: 112
  },
  {
    id: 9,
    name: "Impact Driver - 20V Max",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1581092918484-8313a22c5735?w=400&h=300&fit=crop",
    brand: "PowerTech",
    category: "tools",
    description: "20V Max impact driver with LED light and belt clip.",
    inStock: true,
    rating: 4.7,
    reviews: 189
  },
  {
    id: 10,
    name: "Drain Snake - 25 Foot",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
    brand: "PlumbPro",
    category: "plumbing",
    description: "25-foot drain snake with rotating handle for clearing tough clogs.",
    inStock: true,
    rating: 4.2,
    reviews: 73
  },
  {
    id: 11,
    name: "Safety Helmet - ANSI Certified",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
    brand: "SafeGuard",
    category: "construction",
    description: "ANSI certified safety helmet with adjustable suspension and chin strap.",
    inStock: true,
    rating: 4.5,
    reviews: 78
  },
  {
    id: 12,
    name: "Socket Wrench Set - 42 Piece",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=300&fit=crop",
    brand: "CraftMaster",
    category: "tools",
    description: "Complete 42-piece socket wrench set with ratcheting handle and extension bars.",
    inStock: true,
    rating: 4.6,
    reviews: 145
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.slice(0, 4);
};

export const getProductsBySearch = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};
