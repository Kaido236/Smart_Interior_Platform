import { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
import ProductFilterBar from "../components/product/ProductFilterBar.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { addToCart } from "../services/cartService.js";
import { getProducts } from "../services/productService.js";

const initialFilters = {
  keyword: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  roomType: "",
  style: "",
  sort: "newest",
  page: 0,
  size: 12,
};

function ProductsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [pageData, setPageData] = useState({ items: [], page: 0, size: 12, totalElements: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 250);

    return () => clearTimeout(timer);
  }, [filters]);

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts(filters);
      setPageData(data);
    } catch (requestError) {
      setError(requestError.message || "Could not load products.");
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
      page: name === "page" ? value : 0,
    }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  async function handleAddToCart(product) {
    setAddingProductId(product.id);
    setError("");
    setSuccess("");

    try {
      await addToCart(product.id, 1);
      setSuccess(`${product.name} added to cart.`);
    } catch (requestError) {
      setError(requestError.message || "Could not add product to cart.");
    } finally {
      setAddingProductId(null);
    }
  }

  return (
    <section className="page-section products-page">
      <div className="shop-page-top">
        <div className="products-page-header fade-in">
          <p className="eyebrow">Furniture Catalog</p>
          <h1>Premium Interior Products</h1>
          <p className="section-description">
            Search, filter, and buy furniture listed by Smart Interior users.
          </p>
        </div>

        <div className="shop-header-actions">
          <Button to="/products/sell" variant="secondary">Sell Product</Button>
          <Button to="/cart">Cart</Button>
        </div>
      </div>

      <ProductFilterBar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

      {error && <p className="error-text shop-feedback">{error}</p>}
      {success && <p className="success-text shop-feedback">{success}</p>}
      {loading ? (
        <div className="shop-loading">Loading products...</div>
      ) : (
        <ProductGrid products={pageData.items || []} onAddToCart={handleAddToCart} addingProductId={addingProductId} />
      )}

      {pageData.totalPages > 1 && (
        <div className="shop-pagination">
          <button
            className="filter-pill"
            type="button"
            disabled={pageData.page <= 0}
            onClick={() => handleFilterChange("page", pageData.page - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageData.page + 1} of {pageData.totalPages}
          </span>
          <button
            className="filter-pill"
            type="button"
            disabled={pageData.page >= pageData.totalPages - 1}
            onClick={() => handleFilterChange("page", pageData.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductsPage;
