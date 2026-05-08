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
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Sign in to buy, sell, and manage your furniture orders.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
          id="username"
          ref={usernameInputRef}
          type="email"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="auth-mode-links">
        <button type="button" onClick={() => onSwitchMode("register")} disabled={loading}>
          Need an account? Create one
        </button>
        <button type="button" onClick={() => onSwitchMode("forgot")} disabled={loading}>
          Forgot password?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
