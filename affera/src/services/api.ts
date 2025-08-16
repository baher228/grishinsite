// api.ts — production-safe API client

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

// Optional env override (supports Vite/CRA). If not set, auto-detect.
const ENV_BASE =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_API_BASE) ||
  (typeof process !== "undefined" &&
    (process as any).env &&
    (process as any).env.REACT_APP_API_BASE) ||
  null;

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// In prod: same-origin "/api". In local dev: http://127.0.0.1:4200/api
const API_BASE =
  ENV_BASE ?? (isLocalhost ? "http://127.0.0.1:4200/api" : "/api");

// Helper with better errors
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text || url}`);
  }
  return res.json() as Promise<T>;
}

// Transform backend product to frontend product format
const transformProduct = (apiProduct: ApiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    image: apiProduct.image,
    brand: apiProduct.brand || "Unknown",
    category: apiProduct.category,
    description: apiProduct.description,
    inStock: apiProduct.stock > 0,
    rating: 4.5,
    reviews: 0,
    originalPrice: undefined,
  };
};

export const getProductsByCategory = async (category: string) => {
  const data = await apiFetch<ApiResponse>("/products/category", {
    method: "POST",
    body: JSON.stringify({ category }),
  });
  return data.products.map(transformProduct);
};

export const getAllProducts = async () => {
  // If your backend has GET /products you can switch to that;
  // this mirrors your current POST-to-same-endpoint behavior.
  const data = await apiFetch<ApiResponse>("/products/category", {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.products.map(transformProduct);
};
