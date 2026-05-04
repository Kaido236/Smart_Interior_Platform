const steps = [
  {
    number: "01",
    title: "Share your room",
    text: "Cung cấp thông tin cơ bản về căn phòng, diện tích và nhu cầu sử dụng.",
  },
  {
    number: "02",
    title: "Choose your style",
    text: "Chọn phong cách nội thất phù hợp như minimal, warm wood hoặc modern.",
  },
  {
    number: "03",
    title: "Explore smart interior products",
    text: "Khám phá các sản phẩm nội thất thông minh từ danh sách gợi ý.",
  },
];

function HowItWorksPage() {
  return (
    <section className="mock-page">
      <div className="mock-page-header">
        <p className="eyebrow">Process</p>
        <h1>How It Works</h1>
        <p>Ba bước đơn giản để bắt đầu một trải nghiệm nội thất thông minh.</p>
      </div>

      <div className="mock-card-grid">
        {steps.map((step) => (
          <article className="mock-card" key={step.number}>
            <span>{step.number}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksPage;
