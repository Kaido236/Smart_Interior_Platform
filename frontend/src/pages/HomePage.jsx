import Button from "../components/common/Button.jsx";

function HomePage() {
  return (
    <section className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Modern interior platform</p>
            <h1>Design smarter spaces with premium interior products.</h1>
            <p className="hero-text">
              Explore curated furniture, future auction flows, and AI-powered
              product suggestions from one clean platform.
            </p>
            <Button to="/products">Explore Products</Button>
          </div>

          <div className="hero-panel" aria-label="Interior product preview">
            <span className="hero-panel-label">Featured setup</span>
            <strong>Warm Wood Living Room</strong>
            <p>6 curated products ready for a modern apartment concept.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Platform modules</p>
          <h2>Designed for the next version</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-number">01</span>
            <h3>Curated Interior Products</h3>
            <p>Organize furniture by category, price, room style, and use case.</p>
          </article>
          <article className="feature-card">
            <span className="feature-number">02</span>
            <h3>Smart Auction Experience</h3>
            <p>Prepare a future bidding journey for selected premium pieces.</p>
          </article>
          <article className="feature-card">
            <span className="feature-number">03</span>
            <h3>AI-Powered Suggestions</h3>
            <p>Recommend products based on rooms, taste, and user behavior.</p>
          </article>
        </div>
      </section>

      <section className="why-section">
        <div>
          <p className="eyebrow">Why Smart Interior?</p>
          <h2>Simple enough to learn, structured enough to grow.</h2>
        </div>
        <p>
          This frontend keeps the first version approachable: React pages,
          reusable components, mock data, and a service layer that can later
          connect to real APIs.
        </p>
      </section>
    </section>
  );
}

export default HomePage;
