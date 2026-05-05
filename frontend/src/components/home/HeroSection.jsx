import Button from "../common/Button.jsx";

function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-overlay" />

      <div className="landing-hero-content">
        <p className="hero-kicker">Smart Interior Platform</p>
        <h1>
          Online Interior Design
          <span>for Modern Living</span>
        </h1>
        <Button to="/products" className="hero-cta">
          START MY TRANSFORMATION
        </Button>
      </div>

      <aside className="hero-award-card" aria-label="Project badge">
        <strong>#1</strong>
        <span>Student Project</span>
        <p>Interior Platform</p>
      </aside>
    </section>
  );
}

export default HeroSection;
