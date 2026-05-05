function CommunityPage() {
  return (
    <section className="mock-page">
      <div className="mock-page-header">
        <p className="eyebrow">Community</p>
        <h1>Community</h1>
        <p>
          Nơi người dùng chia sẻ ý tưởng, phong cách thiết kế và bài đăng nội
          thất trong tương lai.
        </p>
      </div>

      <div className="mock-card-grid">
        <article className="mock-card">
          <span>Idea</span>
          <h2>Room inspiration</h2>
          <p>Không gian để người dùng chia sẻ moodboard và cảm hứng thiết kế.</p>
        </article>
        <article className="mock-card">
          <span>Style</span>
          <h2>Interior styles</h2>
          <p>Gợi ý phong cách như minimal, warm wood, modern hoặc Japandi.</p>
        </article>
        <article className="mock-card">
          <span>Post</span>
          <h2>Community posts</h2>
          <p>Nơi có thể mở rộng thành bài đăng, bình luận và tương tác.</p>
        </article>
      </div>
    </section>
  );
}

export default CommunityPage;
