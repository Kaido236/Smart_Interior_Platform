const visualPoints = [
  "Curated interior products",
  "Community inspiration",
  "AI-ready experience",
];

function AuthVisualPanel() {
  return (
    <aside className="auth-visual-panel fade-in" style={{ animationDelay: "0.08s" }}>
      <div className="auth-visual-content">
        <p className="eyebrow">Interior platform</p>
        <h2>Design your space with confidence.</h2>
        <p>
          Explore curated furniture, community ideas, and smart interior tools.
        </p>

        <ul className="auth-visual-list">
          {visualPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AuthVisualPanel;
