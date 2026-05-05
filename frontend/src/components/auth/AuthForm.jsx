import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";

function AuthForm({ user, onLogin, fromHero }) {
  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  const isLogin = authMode === "login";
  const isRegister = authMode === "register";
  const isForgot = authMode === "forgot";

  useEffect(() => {
    if (!fromHero) {
      return;
    }

    const focusTimer = setTimeout(() => {
      if (isForgot) {
        emailInputRef.current?.focus();
        return;
      }

      usernameInputRef.current?.focus();
    }, 120);

    return () => clearTimeout(focusTimer);
  }, [fromHero, isForgot]);

  function clearFeedback() {
    setError("");
    setSuccess("");
  }

  function switchMode(mode) {
    setAuthMode(mode);
    clearFeedback();
    setPassword("");
    setConfirmPassword("");
  }

  function runWithDelay(callback, delay = 800) {
    setLoading(true);
    clearFeedback();

    setTimeout(() => {
      const nextRoute = callback();
      setLoading(false);

      if (nextRoute) {
        navigate(nextRoute);
      }
    }, delay);
  }

  function handleLoginSubmit() {
    runWithDelay(() => {
      const trimmedUsername = username.trim();

      if (!trimmedUsername || !password) {
        setError("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      console.log("Mock login:", { username: trimmedUsername });
      onLogin(trimmedUsername);
      setSuccess("Đăng nhập thành công");
      return "/";
    });
  }

  function handleRegisterSubmit() {
    runWithDelay(() => {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();

      if (!trimmedUsername || !trimmedEmail || !password) {
        setError("Vui lòng nhập đầy đủ thông tin đăng ký");
        return;
      }

      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        return;
      }

      console.log("Mock register:", {
        username: trimmedUsername,
        email: trimmedEmail,
      });
      setAuthMode("login");
      setPassword("");
      setConfirmPassword("");
      setSuccess("Đăng ký thành công, vui lòng đăng nhập");
    });
  }

  function handleForgotSubmit() {
    runWithDelay(() => {
      if (!email.trim()) {
        setError("Vui lòng nhập email");
        return;
      }

      console.log("Mock forgot password:", { email: email.trim() });
      setSuccess("Nếu email tồn tại, hướng dẫn sẽ được gửi");
    }, 1000);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (isLogin) {
      handleLoginSubmit();
      return;
    }

    if (isRegister) {
      handleRegisterSubmit();
      return;
    }

    handleForgotSubmit();
  }

  function getSubmitText() {
    if (loading && isLogin) {
      return "Đang đăng nhập...";
    }

    if (loading && isRegister) {
      return "Đang đăng ký...";
    }

    if (loading && isForgot) {
      return "Đang gửi...";
    }

    if (isRegister) {
      return "Đăng ký";
    }

    if (isForgot) {
      return "Gửi hướng dẫn";
    }

    return "Đăng nhập";
  }

  return (
    <form
      className="login-panel auth-card fade-in"
      style={{ animationDelay: fromHero ? "0.08s" : "0s" }}
      onSubmit={handleSubmit}
    >
      <p className="eyebrow">Demo access</p>
      <h1>
        {isLogin && (user ? "Bạn đã đăng nhập" : "Đăng nhập")}
        {isRegister && "Đăng ký"}
        {isForgot && "Quên mật khẩu"}
      </h1>
      <p className="login-subtitle">
        {isLogin &&
          (user
            ? `Tài khoản mock hiện tại: ${user.displayName || user.username}`
            : "Đăng nhập bằng username và password bất kỳ để thử luồng frontend.")}
        {isRegister && "Tạo tài khoản mock để chuẩn bị cho luồng xác thực thật sau này."}
        {isForgot && "Nhập email để nhận hướng dẫn đặt lại mật khẩu trong phiên bản thật."}
      </p>

      <div className="auth-mode-tabs" aria-label="Auth mode">
        <button
          className={isLogin ? "auth-mode-tab active" : "auth-mode-tab"}
          type="button"
          onClick={() => switchMode("login")}
          disabled={loading}
        >
          Đăng nhập
        </button>
        <button
          className={isRegister ? "auth-mode-tab active" : "auth-mode-tab"}
          type="button"
          onClick={() => switchMode("register")}
          disabled={loading}
        >
          Đăng ký
        </button>
        <button
          className={isForgot ? "auth-mode-tab active" : "auth-mode-tab"}
          type="button"
          onClick={() => switchMode("forgot")}
          disabled={loading}
        >
          Quên mật khẩu
        </button>
      </div>

      {!isForgot && (
        <>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            ref={usernameInputRef}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Nhập username"
          />
        </>
      )}

      {(isRegister || isForgot) && (
        <>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Nhập email"
          />
        </>
      )}

      {!isForgot && (
        <>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập password"
          />
        </>
      )}

      {isRegister && (
        <>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Nhập lại password"
          />
        </>
      )}

      {error && <p className="error-text auth-feedback">{error}</p>}
      {success && <p className="success-text auth-feedback">{success}</p>}

      <Button className="full-width" type="submit" disabled={loading}>
        {getSubmitText()}
      </Button>

      <div className="auth-switch">
        {isLogin && (
          <>
            <button type="button" onClick={() => switchMode("register")} disabled={loading}>
              Chưa có tài khoản? Đăng ký
            </button>
            <button type="button" onClick={() => switchMode("forgot")} disabled={loading}>
              Quên mật khẩu?
            </button>
          </>
        )}
        {!isLogin && (
          <button type="button" onClick={() => switchMode("login")} disabled={loading}>
            Đã có tài khoản? Đăng nhập
          </button>
        )}
      </div>
    </form>
  );
}

export default AuthForm;
