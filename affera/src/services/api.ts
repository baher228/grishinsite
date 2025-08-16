// api.ts — production-safe base URL + helpers (no placeholders)

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

// --- Base URL detection ---
// Prefer env vars if provided (supports both Vite and CRA),
// otherwise: localhost => dev backend URL, everything else => same-origin /api
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

const API_BASE =
  ENV_BASE || (isLocalhost ? "http://localhost:4200/api" : "/api");

// Small helper to call the backend and surface errors nicely
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;

  const res = await fetch(url, {
    // include any defaults you need here
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init && init.headers ? init.headers : {}),
    },
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
    // Frontend-only defaults
    rating: 4.5,
    reviews: 0,
    originalPrice: undefined,
  };
};

export const getProductsByCategory = async (category: string) => {
  // Your backend expects POST /api/products/category with JSON { category }
  const data = await apiFetch<ApiResponse>("/products/category", {
    method: "POST",
    body: JSON.stringify({ category }),
  });
  return data.products.map(transformProduct);
};

export const getAllProducts = async () => {
  // If your backend uses a different route for "all", change the path below.
  // This mirrors your current code which posts to the same endpoint.
  const data = await apiFetch<ApiResponse>("/products/category", {
    method: "POST",
    body: JSON.stringify({}), // send empty JSON; adjust if your API expects something else
  });
  return data.products.map(transformProduct);
};
