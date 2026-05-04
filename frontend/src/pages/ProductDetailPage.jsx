function ProductDetailPage({ product, onBack }) {
  if (!product) {
    return (
      <section className="page-section">
        <button className="back-button" onClick={onBack}>
          Back
        </button>
        <p>Product not found.</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <button className="back-button" onClick={onBack}>
        Back
      </button>

      <div className="detail-layout">
        <img src={product.imageUrl} alt={product.name} className="detail-image" />

        <div className="detail-content">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.shortDescription}</p>
          <p className="detail-note">
            This detail page uses selected product state from App.jsx. It can
            later be replaced by react-router and backend API data.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
