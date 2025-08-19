import React, { useState, useEffect } from "react";
import { ApiProduct } from "../../../services/api";

interface ProductFormProps {
  product: Omit<ApiProduct, "id"> | ApiProduct | null;
  onSave: (productData: any) => void;
  onCancel: () => void;
}

const categories = [
  "Bath & Plumbing",
  "Landscaping",
  "Storage & Shelving",
  "Lighting",
  "Doors & Security",
  "Screws & Fixings",
];

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    image: "",
    category: categories[0],
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        price: product.price || 0,
        image: product.image || "",
        category: product.category || categories[0],
        stock: product.stock || 0,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="product-form">
          <h3>{product && "id" in product ? "Edit Product" : "Add Product"}</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
