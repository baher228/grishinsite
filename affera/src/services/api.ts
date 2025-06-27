interface ApiProduct {
  id: number;
  name: string;
  brand: string | undefined;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ApiResponse {
  products: ApiProduct[];
}

// Transform backend product to frontend product format
const transformProduct = (apiProduct: ApiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    image: apiProduct.image,
    brand: apiProduct.brand || 'Unknown',
    category: apiProduct.category,
    description: apiProduct.description,
    inStock: apiProduct.stock > 0,
    // Default values for frontend-specific fields
    rating: 4.5,
    reviews: 0,
    originalPrice: undefined
  };
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch('http://localhost:4200/api/products/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({category: category}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: ApiResponse = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:4200/api/products/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: ApiResponse = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
