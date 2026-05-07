import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products }) {
  return (
    <div className="products-grid product-grid-shell fade-in">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} animationDelay={`${index * 0.05}s`} />
      ))}
    </div>
  );
}

export default ProductGrid;
