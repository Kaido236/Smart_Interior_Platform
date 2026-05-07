import ProductFilterBar from "../components/product/ProductFilterBar.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { getProducts } from "../services/productService.js";

function ProductsPage() {
  const products = getProducts();

  return (
    <section className="page-section products-page">
      <div className="products-page-header fade-in">
        <p className="eyebrow">Furniture Catalog</p>
        <h1>Premium Interior Products</h1>
        <p className="section-description">
          Curated furniture pieces designed for modern living spaces.
        </p>
      </div>

      <ProductFilterBar />
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductsPage;
