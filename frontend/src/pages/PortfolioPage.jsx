const portfolioItems = [
  "Minimalist Apartment",
  "Warm Wood Living Room",
  "Modern Workspace",
];

function PortfolioPage() {
  return (
    <section className="mock-page">
      <div className="mock-page-header">
        <p className="eyebrow">Portfolio</p>
        <h1>Interior Portfolio</h1>
        <p>Một vài phong cách mock để trình bày ý tưởng thiết kế nội thất.</p>
      </div>

      <div className="mock-card-grid">
        {portfolioItems.map((item) => (
          <article className="mock-card visual-card" key={item}>
            <span>Style</span>
            <h2>{item}</h2>
            <p>Concept card cho phong cách nội thất có thể mở rộng sau này.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PortfolioPage;
