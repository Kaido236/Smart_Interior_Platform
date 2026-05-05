import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>

      <div className="product-card-body">
        <div className="product-card-top">
          <span className="category-badge">{product.category}</span>
          <span className="product-price">${product.price}</span>
        </div>

        <h3>{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>

        <Link className="product-detail-link" to={`/products/${product.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
