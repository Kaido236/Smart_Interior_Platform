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
        <h1>Create account</h1>
        <p className="login-subtitle">
          Start buying and selling furniture through the shop.
        </p>
      </div>

      <div className="register-form-grid">
        <div className="form-group">
          <label htmlFor="registerUsername">Full name</label>
          <input
            id="registerUsername"
            ref={usernameInputRef}
            type="text"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="registerEmail">Email</label>
          <input
            id="registerEmail"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="registerPassword">Password</label>
          <input
            id="registerPassword"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            placeholder="Re-enter your password"
          />
        </div>
      </div>

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <div className="auth-mode-links">
        <button type="button" onClick={() => onSwitchMode("login")} disabled={loading}>
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
