const categories = ["All", "Living Room", "Lighting", "Workspace"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ProductFilterBar() {
  return (
    <div className="product-filter-bar fade-in" aria-label="Product search and filters">
      <label className="product-search" htmlFor="productSearch">
        <SearchIcon />
        <input id="productSearch" type="search" placeholder="Search furniture..." />
      </label>

      <div className="product-filter-pills" aria-label="Static category filters">
        {categories.map((category, index) => (
          <button
            className={index === 0 ? "filter-pill active" : "filter-pill"}
            type="button"
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilterBar;
