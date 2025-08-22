// api.ts — production-safe API client

export interface ApiProduct {
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

// Export helpers to construct absolute URLs for assets returned as file paths.
export const API_BASE_URL = API_BASE;
export const API_ORIGIN = API_BASE.replace(/\/api$/, "");
export const absoluteFromFilePath = (filePath: string) =>
  /^https?:\/\//i.test(filePath) ? filePath : `${API_ORIGIN}${filePath}`;

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
  //const data = await apiFetch<ApiResponse>("/products/all");
  let way: string;
  way = "/products/all";
  const url = `${API_BASE}${way.startsWith("/") ? way : `/${way}`}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch products from server");
  }
  const data = await res.json();

  return data;
};

export const getProductById = async (id: number) => {
  const data = await apiFetch<{ product: ApiProduct }>(`/products/${id}`);
  return transformProduct(data.product);
};

export const login = async (username: string, password: string) => {
  return apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const createProduct = async (
  productData: Omit<ApiProduct, "id">,
  token: string
) => {
  return apiFetch<{ product: ApiProduct }>("/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (
  id: number,
  productData: Partial<ApiProduct>,
  token: string
) => {
  return apiFetch<{ product: ApiProduct }>(`/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = async (id: number, token: string) => {
  const url = `${API_BASE}/products/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text || url}`);
  }
};

// NOTE: token is now OPTIONAL; cookie auth (credentials: "include") will be used if available.
export const uploadImage = async (file: File, tokenArg?: string) => {
  const url = `${API_BASE}/upload/image`;
  const formData = new FormData();
  formData.append("image", file);

  // Try the explicit arg first; otherwise fall back to localStorage.
  let token = tokenArg;
  if (!token && typeof window !== "undefined") {
    try {
      const t = window.localStorage.getItem("token");
      if (t) token = t;
    } catch {
      // ignore localStorage access errors
    }
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include", // ok to include cookies, but server still needs Bearer
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP 401 Unauthorized – ${text || url}`);
  }
  return res.json() as Promise<{ filePath: string }>;
};
