import { Link } from "react-router-dom";

function ProductCard({ product, animationDelay = "0s" }) {
  return (
    <article className="product-card fade-in" style={{ animationDelay }}>
      <Link className="product-card-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <div className="product-image-frame">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>

        <div className="product-card-body">
          <span className="category-badge">{product.category}</span>

          <h3>{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>

          <div className="product-card-footer">
            <span className="product-price">${product.price}</span>
            <span className="product-detail-link">View Details</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
