const posts = [
  "How to choose a sofa",
  "Small room design tips",
  "Warm lighting for modern homes",
];

function BlogPage() {
  return (
    <section className="mock-page">
      <div className="mock-page-header">
        <p className="eyebrow">Ideas</p>
        <h1>Interior Design Blog</h1>
        <p>Các bài viết mock cho phần chia sẻ kiến thức nội thất.</p>
      </div>

      <div className="mock-card-grid">
        {posts.map((post) => (
          <article className="mock-card" key={post}>
            <span>Article</span>
            <h2>{post}</h2>
            <p>Nội dung tóm tắt sẽ được bổ sung khi module blog hoàn thiện.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogPage;
