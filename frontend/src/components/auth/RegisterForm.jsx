import Button from "../common/Button.jsx";

function RegisterForm({
  username,
  email,
  password,
  confirmPassword,
  loading,
  error,
  success,
  usernameInputRef,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onSwitchMode,
}) {
  return (
    <form className="auth-form-content fade-in" onSubmit={onSubmit}>
      <div className="auth-card-header">
        <p className="eyebrow">Smart Interior</p>
        <h1>Tạo tài khoản mới</h1>
        <p className="login-subtitle">
          Bắt đầu lưu ý tưởng và khám phá sản phẩm nội thất phù hợp với bạn.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="registerUsername">Tên đăng nhập</label>
        <input
          id="registerUsername"
          ref={usernameInputRef}
          type="text"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          placeholder="Nhập tên đăng nhập"
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerEmail">Email</label>
        <input
          id="registerEmail"
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Nhập email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerPassword">Mật khẩu</label>
        <input
          id="registerPassword"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Nhập mật khẩu"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => onConfirmPasswordChange(event.target.value)}
          placeholder="Nhập lại mật khẩu"
        />
      </div>

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </Button>

      <div className="auth-mode-links">
        <button type="button" onClick={() => onSwitchMode("login")} disabled={loading}>
          Đã có tài khoản? Đăng nhập
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
