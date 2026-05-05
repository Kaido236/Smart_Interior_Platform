import AuthVisualPanel from "./AuthVisualPanel.jsx";

function AuthLayout({ children, authMode = "login" }) {
  const isFocusedMode = authMode === "register" || authMode === "forgot";
  const layoutClassName = `auth-layout-page auth-layout-${authMode}${
    isFocusedMode ? " auth-layout-focused" : ""
  }`;

  return (
    <section className={layoutClassName}>
      <div className="auth-container">
        {!isFocusedMode && (
          <div className="auth-right">
            <AuthVisualPanel />
          </div>
        )}
        <div className="auth-left">{children}</div>
      </div>
    </section>
  );
}

export default AuthLayout;
