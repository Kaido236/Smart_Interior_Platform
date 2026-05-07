import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { addToCart } from "../services/cartService.js";
import { getProductById } from "../services/productService.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        if (!ignore) {
          setProduct(data);
          setQuantity(1);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message || "Product not found");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleAddToCart() {
    if (!product) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await addToCart(product.id, quantity);
      setSuccess("Product added to cart.");
    } catch (requestError) {
      setError(requestError.message || "Could not add product to cart.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="page-section empty-state">
        <p className="eyebrow">Loading</p>
        <h1>Loading product details...</h1>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page-section empty-state">
        <p className="eyebrow">Product not found</p>
        <h1>We could not find this product.</h1>
        <p>{error || "The product may have been removed or the URL is not correct."}</p>
        <Button to="/products">Back to Products</Button>
      </section>
    );
  }

  return (
    <section className="page-section">
      <Link className="back-link" to="/products">
        Back to Products
      </Link>

      <div className="detail-layout">
        <div className="detail-media">
          <img src={product.imageUrl || fallbackImage} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-content">
          <span className="category-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">
            {product.description || product.shortDescription || "No description provided."}
          </p>

          <div className="product-meta-grid">
            <span>Stock: {product.stockQuantity}</span>
            {product.material && <span>Material: {product.material}</span>}
            {product.color && <span>Color: {product.color}</span>}
            {product.style && <span>Style: {product.style}</span>}
            {product.roomType && <span>Room: {product.roomType}</span>}
            {product.sellerName && <span>Seller: {product.sellerName}</span>}
          </div>

          <div className="detail-actions">
            <label className="quantity-control">
              Quantity
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
              />
            </label>
            <Button type="button" onClick={handleAddToCart} disabled={saving || product.stockQuantity < 1}>
              {saving ? "Adding..." : "Add to Cart"}
            </Button>
            <Button to="/cart" variant="secondary">
              View Cart
            </Button>
          </div>

          {error && <p className="error-text shop-feedback">{error}</p>}
          {success && <p className="success-text shop-feedback">{success}</p>}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
