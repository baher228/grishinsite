import React, { useState, useEffect } from "react";
import { ApiProduct, uploadImage } from "../../../services/api";

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

// Allow price to be number | '' so users can clear it while typing
type FormDataState = {
  name: string;
  brand: string;
  description: string;
  price: number | "";
  image: string;
  category: string;
  stock: number;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    image: "",
    category: categories[0],
    stock: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      setImagePreview(product.image || null);
      setSelectedFile(null);
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        brand: "",
        description: "",
        price: 0,
        image: "",
        category: categories[0],
        stock: 0,
      });
      setImagePreview(null);
      setSelectedFile(null);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Special handling ONLY for price to avoid the "stuck zero" issue
    if (name === "price") {
      setFormData((prev) => ({
        ...prev,
        price: value === "" ? "" : Number(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  // When tapping into the price field, remove the initial zero
  const handlePriceFocus = () => {
    setFormData((prev) => ({
      ...prev,
      price: prev.price === 0 ? "" : prev.price,
    }));
  };

  // If the user leaves the price empty, normalize it back to 0
  const handlePriceBlur = () => {
    setFormData((prev) => ({
      ...prev,
      price: prev.price === "" ? 0 : prev.price,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.image;

    if (selectedFile) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error. Please log in again.");
        return;
      }

      try {
        const { filePath } = await uploadImage(selectedFile, token);
        // Construct the full URL to the image
        const serverBase = "http://127.0.0.1:4200";
        imageUrl = `${serverBase}${filePath}`;
      } catch (err) {
        console.error(err);
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    // Ensure price is a number when saving ('' -> 0)
    const normalizedPrice = formData.price === "" ? 0 : formData.price;

    onSave({ ...formData, price: normalizedPrice, image: imageUrl });
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
              onFocus={handlePriceFocus}
              onBlur={handlePriceBlur}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL or upload a file"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Or Upload Image</label>
            <input type="file" name="imageFile" onChange={handleFileChange} />
          </div>
          {imagePreview && (
            <div className="form-group">
              <label>Image Preview</label>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

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
