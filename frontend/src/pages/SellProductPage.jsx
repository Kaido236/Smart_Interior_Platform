import { useState } from "react";
import ProductForm, { buildProductFormState, toProductPayload } from "../components/product/ProductForm.jsx";
import { createProduct } from "../services/productService.js";

function SellProductPage() {
  const [form, setForm] = useState(buildProductFormState());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = toProductPayload(form);
      delete payload.status;
      await createProduct(payload);
      setForm(buildProductFormState());
      setSuccess("Product listed successfully.");
    } catch (requestError) {
      setError(requestError.message || "Could not create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section shop-management-page">
      <div className="products-page-header fade-in">
        <p className="eyebrow">Sell Furniture</p>
        <h1>List a product</h1>
        <p className="section-description">Add a furniture product to the public shop catalog.</p>
      </div>

      {error && <p className="error-text shop-feedback">{error}</p>}
      {success && <p className="success-text shop-feedback">{success}</p>}

      <ProductForm value={form} onChange={setForm} onSubmit={handleSubmit} loading={loading} submitLabel="Publish Product" />
    </section>
  );
}

export default SellProductPage;
