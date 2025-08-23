// api.ts — robust API client + image path normalization

export interface ApiProduct {
  id: number;
  name: string;
  brand: string | undefined;
  description: string;
  price: number;
  image: string; // may be '/uploads/x.jpg', 'public/uploads/x.jpg', or even 'x.jpg'
  category: string;
  stock: number;
}

interface ApiResponseShapeA {
  products: ApiProduct[];
} // /products/* returns { products: [...] }
type ApiResponse = ApiResponseShapeA | ApiProduct[]; // tolerate both shapes

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
export const API_BASE_URL = API_BASE;

// Derive an origin only if API_BASE is absolute; '/api' -> ''
function originFromApiBase(api: string): string {
  try {
    if (/^https?:\/\//i.test(api)) return new URL(api).origin;
  } catch {}
  return "";
}
export const API_ORIGIN = originFromApiBase(API_BASE);

// Safe join that ALWAYS yields a single leading slash when API_ORIGIN is ''
const join = (a: string, b: string) =>
  (a ? a.replace(/\/+$/, "") : "") + "/" + (b || "").replace(/^\/+/, "");

// Normalize any backend-provided image path into a browser-usable URL
export const absoluteFromFilePath = (filePath: string) => {
  if (!filePath) return filePath;
  if (/^https?:\/\//i.test(filePath)) return filePath;

  // Fix Windows slashes and strip accidental "public/" prefix
  let s = filePath.replace(/\\/g, "/").replace(/^\/?public\//, "/");
  // Ensure we mount under /uploads if someone saved 'uploads/...'
  if (!s.startsWith("/")) s = "/" + s;

  // If someone saved just 'foo.jpg', default it under /uploads/
  if (!/^\/(uploads|api\/uploads)\//.test(s) && /\.[a-z0-9]+$/i.test(s)) {
    s = "/uploads" + (s.startsWith("/") ? "" : "/") + s.replace(/^\//, "");
  }

  return join(API_ORIGIN, s);
};

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
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text || url}`);
  }
  return res.json() as Promise<T>;
}

const transformProduct = (apiProduct: ApiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    // CRITICAL: normalize the path so <img src=...> points to a valid HTTPS URL on the same origin
    image: absoluteFromFilePath(apiProduct.image),
    brand: apiProduct.brand || "Unknown",
    category: apiProduct.category,
    description: apiProduct.description,
    stock: apiProduct.stock,
  };
};

export const getProductsByCategory = async (category: string) => {
  const data = await apiFetch<ApiResponse>("/products/category", {
    method: "POST",
    body: JSON.stringify({ category }),
  });
  const products = Array.isArray(data) ? data : data.products;
  return products.map(transformProduct);
};

export const getAllProducts = async () => {
  // Tolerate either {products:[...]} or just [...]
  const data = await apiFetch<ApiResponse>("/products/all");
  const products = Array.isArray(data) ? data : data.products;
  return products.map(transformProduct);
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
    headers: { Authorization: `Bearer ${token}` },
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
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = async (id: number, token: string) => {
  const url = `${API_BASE}/products/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text || url}`);
  }
};

// NOTE: token is OPTIONAL; cookie auth will be used if available.
export const uploadImage = async (file: File, tokenArg?: string) => {
  const url = `${API_BASE}/upload/image`;
  const formData = new FormData();
  formData.append("image", file);

  let token = tokenArg;
  if (!token && typeof window !== "undefined") {
    try {
      const t = window.localStorage.getItem("token");
      if (t) token = t;
    } catch {
      /* ignore */
    }
  }

  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text || url}`);
  }

  // If your UI wants a fully usable URL, normalize here as well:
  const payload = (await res.json()) as { filePath: string };
  return { filePath: absoluteFromFilePath(payload.filePath) };
};
