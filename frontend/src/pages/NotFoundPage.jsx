import Button from "../components/common/Button.jsx";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist in this frontend version.
        </p>
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  );
}

export default NotFoundPage;
