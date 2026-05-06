import Button from "../common/Button.jsx";

function LoginForm({
  username,
  password,
  loading,
  error,
  success,
  usernameInputRef,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onSwitchMode,
}) {
  return (
    <form className="auth-form-content fade-in" onSubmit={onSubmit}>
      <div className="auth-card-header">
        <p className="eyebrow">Smart Interior</p>
        <h1>Chào mừng trở lại</h1>
        <p className="login-subtitle">
          Đăng nhập để tiếp tục khám phá không gian nội thất của bạn.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          id="username"
          ref={usernameInputRef}
          type="text"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          placeholder="Nhập tên đăng nhập"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Nhập mật khẩu"
        />
      </div>

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      <div className="auth-mode-links">
        <button type="button" onClick={() => onSwitchMode("register")} disabled={loading}>
          Chưa có tài khoản? Tạo tài khoản
        </button>
        <button type="button" onClick={() => onSwitchMode("forgot")} disabled={loading}>
          Quên mật khẩu?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
