import AuthVisualPanel from "./AuthVisualPanel.jsx";

function AuthLayout({ children }) {
  return (
    <section className="auth-layout-page">
      <div className="auth-container">
        <div className="auth-right">
          <AuthVisualPanel />
        </div>
        <div className="auth-left">{children}</div>
      </div>
    </section>
  );
}

export default AuthLayout;
