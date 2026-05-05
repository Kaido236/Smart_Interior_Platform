const reasons = [
  {
    title: "Curated furniture",
    text: "A clean catalog structure for premium interior products and room setups.",
  },
  {
    title: "Future auction flow",
    text: "The product experience is ready to grow into bidding and seller flows.",
  },
  {
    title: "AI-ready recommendation",
    text: "The frontend can later connect to smart suggestions through backend APIs.",
  },
];

function WhySmartInterior() {
  return (
    <section className="landing-section why-smart-section fade-in" style={{ animationDelay: "0.12s" }}>
      <div className="landing-section-header">
        <p className="eyebrow">Why Smart Interior?</p>
        <h2>Premium interface now, scalable platform later.</h2>
      </div>

      <div className="why-smart-grid">
        {reasons.map((reason) => (
          <article className="why-smart-card" key={reason.title}>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhySmartInterior;
