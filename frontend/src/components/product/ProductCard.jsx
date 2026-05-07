import { Link } from "react-router-dom";

const fallbackImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function ProductCard({ product, animationDelay = "0s", onAddToCart, adding = false }) {
  const description = product.shortDescription || product.description || "Furniture product for modern interiors.";

  return (
    <article className="product-card fade-in" style={{ animationDelay }}>
      <Link className="product-card-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <div className="product-image-frame">
          <img src={product.imageUrl || fallbackImage} alt={product.name} className="product-image" />
        </div>
      </Link>

      <div className="product-card-body">
        <span className="category-badge">{product.category}</span>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-description">{description}</p>

        <div className="product-card-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          {onAddToCart ? (
            <button
              className="product-detail-link"
              type="button"
              disabled={adding || product.stockQuantity < 1}
              onClick={() => onAddToCart(product)}
            >
              {adding ? "Adding..." : "Add"}
            </button>
          ) : (
            <Link className="product-detail-link" to={`/products/${product.id}`}>
              View Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
