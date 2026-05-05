import Button from "../common/Button.jsx";

function ForgotPasswordForm({
  email,
  loading,
  error,
  success,
  emailInputRef,
  onEmailChange,
  onSubmit,
  onSwitchMode,
}) {
  return (
    <form className="auth-form-content fade-in" onSubmit={onSubmit}>
      <div className="auth-card-header">
        <p className="eyebrow">Smart Interior</p>
        <h1>Khôi phục mật khẩu</h1>
        <p className="login-subtitle">
          Nhập email để nhận hướng dẫn đặt lại mật khẩu.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="forgotEmail">Email</label>
        <input
          id="forgotEmail"
          ref={emailInputRef}
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Nhập email"
        />
      </div>

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi hướng dẫn"}
      </Button>

      <div className="auth-mode-links">
        <button type="button" onClick={() => onSwitchMode("login")} disabled={loading}>
          Nhớ mật khẩu rồi? Đăng nhập
        </button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
