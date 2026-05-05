import ProductCard from "../product/ProductCard.jsx";
import { getProducts } from "../../services/productService.js";

function FeaturedProducts() {
  const featuredProducts = getProducts().slice(0, 3);

  return (
    <section className="landing-section featured-section fade-in" style={{ animationDelay: "0.08s" }}>
      <div className="landing-section-header centered">
        <p className="eyebrow">Featured Products</p>
        <h2>Premium pieces ready for a smarter home.</h2>
      </div>

      <div className="products-grid featured-products-grid">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} animationDelay={`${index * 0.08}s`} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
