import React, { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  ApiProduct,
  getAllProducts,
} from "../../../services/api";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// 🔒 Helper: check if a JWT is expired via its `exp` claim
const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const exp = typeof decoded?.exp === "number" ? decoded.exp : 0;
    return exp * 1000 <= Date.now();
  } catch {
    // If the token is malformed or cannot be decoded, treat it as expired
    return true;
  }
};

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();

  // ✅ Redirect if not logged in OR if token is expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  // 🔒 Centralized auth error handler: log out on 401/expired token
  const handleAuthError = (err: any) => {
    const status = err?.response?.status ?? err?.status;
    const msg = String(err?.message || "").toLowerCase();
    const looksExpired = msg.includes("token") && msg.includes("expired");
    if (status === 401 || looksExpired) {
      localStorage.removeItem("token");
      navigate("/admin/login", { replace: true });
      return true; // handled
    }
    return false; // not an auth error
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray((data as any).products)) {
          setProducts((data as any).products);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err: any) {
        if (handleAuthError(err)) return;
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (
    productData: Omit<ApiProduct, "id"> | ApiProduct
  ) => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setError("Authentication error. Please log in again.");
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      if (editingProduct) {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData,
          token
        );
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? updatedProduct.product : p
          )
        );
      } else {
        const newProduct = await createProduct(productData, token);
        setProducts([...products, newProduct.product]);
      }
      closeForm();
    } catch (err: any) {
      if (handleAuthError(err)) return;
      setError("Failed to save product. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        setError("Authentication error. Please log in again.");
        navigate("/admin/login", { replace: true });
        return;
      }
      try {
        await deleteProduct(id, token);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err: any) {
        if (handleAuthError(err)) return;
        setError("Failed to delete product.");
      }
    }
  };

  const openForm = (product: ApiProduct | null = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => openForm()} className="add-btn">
        Add New Product
      </button>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      <h2>Products</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>£{Number(product.price).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <button
                    onClick={() => openForm(product)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
