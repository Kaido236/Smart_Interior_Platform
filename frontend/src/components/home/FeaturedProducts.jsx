import ProductCard from "../product/ProductCard.jsx";
import { getProducts } from "../../services/productService.js";

function FeaturedProducts() {
  const featuredProducts = getProducts().slice(0, 3);

  return (
    <section className="landing-section featured-section">
      <div className="landing-section-header centered">
        <p className="eyebrow">Featured Products</p>
        <h2>Premium pieces ready for a smarter home.</h2>
      </div>

      <div className="products-grid featured-products-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
