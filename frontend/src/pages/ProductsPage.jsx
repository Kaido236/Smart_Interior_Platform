import ProductCard from "../components/product/ProductCard.jsx";
import { getProducts } from "../services/productService.js";

function ProductsPage() {
  const products = getProducts();

  return (
    <section className="page-section">
      <div className="section-header products-header">
        <div>
          <p className="eyebrow">Furniture catalog</p>
          <h1>Premium interior products</h1>
          <p className="section-description">
            Browse mock furniture products prepared for the first version of
            Smart Interior Platform.
          </p>
        </div>

        <div className="catalog-toolbar" aria-label="Static product filters">
          <span>All Products</span>
          <span>Living Room</span>
          <span>Lighting</span>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} animationDelay={`${index * 0.05}s`} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
