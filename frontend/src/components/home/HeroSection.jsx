import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";

function HeroSection() {
  const navigate = useNavigate();

  function handleStartClick() {
    navigate("/login", { state: { fromHero: true } });
  }

  return (
    <section className="landing-hero">
      <div className="landing-hero-overlay" />

      <div className="landing-hero-content">
        <p className="hero-kicker">Smart Interior Platform</p>
        <h1>
          Online Interior Design
          <span>for Modern Living</span>
        </h1>
        <Button className="hero-cta" onClick={handleStartClick}>
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
