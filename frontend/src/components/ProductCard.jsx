function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />

      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>

        <div className="product-card-footer">
          <span className="product-price">${product.price}</span>
          <button className="text-button" onClick={() => onSelect(product)}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
