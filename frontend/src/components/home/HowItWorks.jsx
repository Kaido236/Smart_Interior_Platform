const steps = [
  {
    id: 1,
    title: "Share your space",
    text: "Tell us about your room, goal, and preferred interior mood.",
  },
  {
    id: 2,
    title: "Choose your style",
    text: "Explore warm, modern, minimal, or premium furniture directions.",
  },
  {
    id: 3,
    title: "Explore smart products",
    text: "Browse products prepared for marketplace, auction, and AI features.",
  },
];

function HowItWorks() {
  return (
    <section className="landing-section" id="how-it-works">
      <div className="landing-section-header">
        <p className="eyebrow">How It Works</p>
        <h2>A simple path from idea to curated interior setup.</h2>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.id}>
            <span>{step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
