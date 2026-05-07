const categories = ["", "Chair", "Sofa", "Table", "Lighting", "Storage", "Bedroom", "Decor"];
const roomTypes = ["", "Living Room", "Bedroom", "Kitchen", "Workspace", "Dining Room"];
const styles = ["", "Modern", "Minimal", "Scandinavian", "Classic", "Industrial"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ProductFilterBar({ filters, onFilterChange, onReset }) {
  return (
    <div className="product-filter-bar fade-in" aria-label="Product search and filters">
      <label className="product-search" htmlFor="productSearch">
        <SearchIcon />
        <input
          id="productSearch"
          type="search"
          value={filters.keyword}
          onChange={(event) => onFilterChange("keyword", event.target.value)}
          placeholder="Search furniture..."
        />
      </label>

      <div className="shop-filter-controls">
        <select
          aria-label="Category"
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          {categories.map((category) => (
            <option key={category || "all"} value={category}>
              {category || "All categories"}
            </option>
          ))}
        </select>

        <select
          aria-label="Room type"
          value={filters.roomType}
          onChange={(event) => onFilterChange("roomType", event.target.value)}
        >
          {roomTypes.map((roomType) => (
            <option key={roomType || "all"} value={roomType}>
              {roomType || "All rooms"}
            </option>
          ))}
        </select>

        <select
          aria-label="Style"
          value={filters.style}
          onChange={(event) => onFilterChange("style", event.target.value)}
        >
          {styles.map((style) => (
            <option key={style || "all"} value={style}>
              {style || "All styles"}
            </option>
          ))}
        </select>

        <input
          className="price-filter-input"
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) => onFilterChange("minPrice", event.target.value)}
          placeholder="Min"
          aria-label="Minimum price"
        />

        <input
          className="price-filter-input"
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange("maxPrice", event.target.value)}
          placeholder="Max"
          aria-label="Maximum price"
        />

        <select
          aria-label="Sort products"
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price low to high</option>
          <option value="price_desc">Price high to low</option>
        </select>

        <button className="filter-pill" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default ProductFilterBar;
