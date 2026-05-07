import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, onAddToCart, addingProductId }) {
  if (!products.length) {
    return (
      <div className="empty-state shop-empty-state">
        <p className="eyebrow">No products</p>
        <h1>No furniture matched your filters.</h1>
        <p>Try a different search keyword or clear the filters.</p>
      </div>
    );
  }

  return (
    <div className="products-grid product-grid-shell fade-in">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          animationDelay={`${index * 0.05}s`}
          onAddToCart={onAddToCart}
          adding={addingProductId === product.id}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
