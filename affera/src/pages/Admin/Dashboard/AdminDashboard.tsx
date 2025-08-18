import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ApiProduct,
} from "../../../services/api";

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // HACK: Bypassing api.ts->getAllProducts because it transforms the data.
        // The admin dashboard needs the raw `stock` number, not `inStock`.
        // This should be refactored in api.ts to provide a raw data endpoint.
        const res = await fetch("http://127.0.0.1:4200/api/products/all");
        if (!res.ok) {
          throw new Error("Failed to fetch products from server");
        }
        const data = await res.json();
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCreate = async (productData: Omit<ApiProduct, "id">) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { product } = await createProduct(productData, token);
      setProducts([...products, product]);
    } catch (err) {
      setError("Failed to create product");
    }
  };

  const handleUpdate = async (id: number, productData: Partial<ApiProduct>) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { product } = await updateProduct(id, productData, token);
      setProducts(products.map((p) => (p.id === id ? product : p)));
      setEditingProduct(null);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add form for creating and editing products here */}
      <h2>Products</h2>
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
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
