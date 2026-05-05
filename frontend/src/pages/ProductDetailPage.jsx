import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { getProductById } from "../services/productService.js";

function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <section className="page-section empty-state">
        <p className="eyebrow">Product not found</p>
        <h1>We could not find this product.</h1>
        <p>The product may have been removed or the URL is not correct.</p>
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
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-content">
          <span className="category-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">
            {product.description || product.shortDescription}
          </p>

          <div className="detail-actions">
            <Button type="button">Add to Wishlist</Button>
            <Button type="button" variant="secondary">
              Contact Seller
            </Button>
          </div>

          <div className="detail-note">
            <strong>Starter note</strong>
            <p>This page gets product data from the mock service.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
