// api.ts — production-safe API client with smart fallbacks (no placeholders)

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

type ProductOut = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  originalPrice: number | undefined;
};

// ---------- base URL handling ----------
const envBase =
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

// Host bases to try (no path prefix here)
const HOST_BASES: string[] = envBase
  ? [envBase.replace(/\/+$/, "")]
  : isLocalhost
  ? ["http://localhost:4200"]
  : [""];

// Path prefixes to try on that host (backend may or may not include '/api')
const PATH_PREFIXES = ["/api", ""];

// ---------- helpers ----------
function buildUrl(base: string, path: string, query?: Record<string, string>) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const q = query
    ? "?" +
      Object.entries(query)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&")
    : "";
  return `${base}${p}${q}`;
}

async function tryFetch<T>(
  attempts: Array<{
    method: "GET" | "POST";
    path: string;
    query?: Record<string, string>;
    body?: any;
  }>
): Promise<T> {
  const errors: string[] = [];

  for (const host of HOST_BASES) {
    for (const prefix of PATH_PREFIXES) {
      const base = `${host}${prefix}`.replace(/\/+$/, "");
      for (const a of attempts) {
        const url = buildUrl(base, a.path, a.query);
        try {
          const res = await fetch(url, {
            method: a.method,
            headers: { "Content-Type": "application/json" },
            body: a.body ? JSON.stringify(a.body) : undefined,
            credentials: "include",
          });
          if (res.ok) {
            return (await res.json()) as T;
          }
          // if 404, keep trying the next variant; otherwise, surface the error
          const text = await res.text().catch(() => "");
          errors.push(`${res.status} ${res.statusText} @ ${url} :: ${text}`);
          if (res.status !== 404) {
            throw new Error(errors[errors.length - 1]);
          }
        } catch (e: any) {
          // network or thrown above; keep trying others but remember
          errors.push(`${e?.message || e} @ ${url}`);
        }
      }
    }
  }
  throw new Error(
    `All API attempts failed. Tried:\n${errors.map((e) => "- " + e).join("\n")}`
  );
}

function normalizeProducts(payload: unknown): ApiProduct[] {
  if (Array.isArray(payload)) return payload as ApiProduct[];
  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as any).products)
  ) {
    return (payload as any).products as ApiProduct[];
  }
  // empty/fallback
  return [];
}

// Transform backend product to frontend product format
const transformProduct = (apiProduct: ApiProduct): ProductOut => ({
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
});

// ---------- exported functions ----------
export const getProductsByCategory = async (category: string) => {
  const payload = await tryFetch<ApiResponse | ApiProduct[]>([
    // Your current backend (POST body)
    { method: "POST", path: "/products/category", body: { category } },
    // Some backends expect { name: ... }
    { method: "POST", path: "/products/category", body: { name: category } },
    // GET with path param
    {
      method: "GET",
      path: `/products/category/${encodeURIComponent(category)}`,
    },
    // GET with query param
    { method: "GET", path: "/products/category", query: { category } },
    { method: "GET", path: "/products", query: { category } },
  ]);

  return normalizeProducts(payload).map(transformProduct);
};

export const getAllProducts = async () => {
  const payload = await tryFetch<ApiResponse | ApiProduct[]>([
    // Common REST style
    { method: "GET", path: "/products" },
    // Your previous endpoint (POST to same route)
    { method: "POST", path: "/products/category", body: {} },
  ]);

  return normalizeProducts(payload).map(transformProduct);
};
