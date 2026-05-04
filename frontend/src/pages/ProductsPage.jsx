import ProductCard from "../components/ProductCard.jsx";
import { getProducts } from "../services/productService.js";

function ProductsPage({ onSelectProduct }) {
  const products = getProducts();

  return (
    <section className="page-section">
      <div className="section-header">
        <p className="eyebrow">Furniture catalog</p>
        <h1>Products</h1>
        <p className="section-description">
          Browse mock interior products. The data currently comes from a local
          JavaScript file.
        </p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
