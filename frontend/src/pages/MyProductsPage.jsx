import { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
import ProductForm, { buildProductFormState, toProductPayload } from "../components/product/ProductForm.jsx";
import { deleteProduct, getMyProducts, updateProduct } from "../services/productService.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(buildProductFormState());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      setProducts(await getMyProducts());
    } catch (requestError) {
      setError(requestError.message || "Could not load your products.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm(buildProductFormState(product));
    setSuccess("");
    setError("");
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateProduct(editingId, toProductPayload(form));
      setEditingId(null);
      setForm(buildProductFormState());
      setSuccess("Product updated successfully.");
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message || "Could not update product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(productId) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await deleteProduct(productId);
      setSuccess("Product deleted successfully.");
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message || "Could not delete product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-section shop-management-page">
      <div className="shop-page-top">
        <div className="products-page-header fade-in">
          <p className="eyebrow">Seller Dashboard</p>
          <h1>My products</h1>
          <p className="section-description">Update or hide products you have listed.</p>
        </div>
        <Button to="/products/sell">Sell Product</Button>
      </div>

      {error && <p className="error-text shop-feedback">{error}</p>}
      {success && <p className="success-text shop-feedback">{success}</p>}

      {editingId && (
        <div className="shop-panel">
          <h2>Edit product</h2>
          <ProductForm
            value={form}
            onChange={setForm}
            onSubmit={handleUpdate}
            loading={saving}
            submitLabel="Update Product"
            showStatus
          />
          <button className="filter-pill" type="button" onClick={() => setEditingId(null)}>
            Cancel edit
          </button>
        </div>
      )}

      {loading ? (
        <div className="shop-loading">Loading products...</div>
      ) : (
        <div className="shop-list">
          {products.map((product) => (
            <article className="shop-list-item" key={product.id}>
              <img src={product.imageUrl || fallbackImage} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.category} - {formatPrice(product.price)} - Stock {product.stockQuantity}</p>
                <p>Status: {product.status}</p>
              </div>
              <div className="shop-list-actions">
                <button className="filter-pill" type="button" onClick={() => startEdit(product)}>
                  Edit
                </button>
                <button className="filter-pill" type="button" disabled={saving} onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!products.length && <p className="shop-loading">You have not listed products yet.</p>}
        </div>
      )}
    </section>
  );
}

export default MyProductsPage;
