function HomePage({ onNavigate }) {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <p className="eyebrow">Interior marketplace starter</p>
          <h1>Smart Interior</h1>
          <p className="hero-text">
            Discover clean, practical furniture ideas for modern homes. This
            starter frontend is ready to grow into a full interior platform.
          </p>
          <button className="primary-button" onClick={() => onNavigate("products")}>
            Explore Products
          </button>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Future modules</p>
          <h2>Built for simple expansion</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-item">
            <h3>Interior Marketplace</h3>
            <p>Browse furniture products with categories, prices, and details.</p>
          </article>
          <article className="feature-item">
            <h3>Auction System</h3>
            <p>Add bidding flows later for selected furniture and decor items.</p>
          </article>
          <article className="feature-item">
            <h3>AI Recommendation</h3>
            <p>Suggest products based on style, room type, and user behavior.</p>
          </article>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
