import React, { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  ApiProduct,
  getAllProducts,
} from "../../../services/api";
import ProductForm from "./ProductForm";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
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

  const handleSave = async (
    productData: Omit<ApiProduct, "id"> | ApiProduct
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error. Please log in again.");
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
    } catch (err) {
      setError("Failed to save product. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication error. Please log in again.");
        return;
      }
      try {
        await deleteProduct(id, token);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
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
