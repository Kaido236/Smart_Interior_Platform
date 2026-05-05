import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

function AuthForm({ authMode = "login", onAuthModeChange, onLogin, fromHero, returnTo = "/" }) {
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

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      if (authMode === "forgot") {
        emailInputRef.current?.focus();
        return;
      }

      if (fromHero || authMode !== "login") {
        usernameInputRef.current?.focus();
      }
    }, 120);

    return () => clearTimeout(focusTimer);
  }, [authMode, fromHero]);

  function clearFeedback() {
    setError("");
    setSuccess("");
  }

  function switchMode(mode) {
    onAuthModeChange(mode);
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

  function getSafeReturnPath() {
    if (!returnTo || returnTo === "/login") {
      return "/";
    }

    return returnTo;
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    runWithDelay(() => {
      const trimmedUsername = username.trim();

      if (!trimmedUsername || !password) {
        setError("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      console.log("Mock login:", { username: trimmedUsername });
      onLogin(trimmedUsername);
      return getSafeReturnPath();
    });
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    runWithDelay(() => {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();

      if (!trimmedUsername || !trimmedEmail || !password) {
        setError("Vui lòng nhập đầy đủ thông tin đăng ký.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        return;
      }

      console.log("Mock register:", {
        username: trimmedUsername,
        email: trimmedEmail,
      });
      setUsername(trimmedUsername);
      onAuthModeChange("login");
      setPassword("");
      setConfirmPassword("");
      setSuccess("Tạo tài khoản thành công. Vui lòng đăng nhập.");
    });
  }

  function handleForgotSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    runWithDelay(() => {
      if (!email.trim()) {
        setError("Vui lòng nhập email.");
        return;
      }

      console.log("Mock forgot password:", { email: email.trim() });
      setSuccess("Nếu email tồn tại, hướng dẫn sẽ được gửi đến bạn.");
    });
  }

  function renderCurrentForm() {
    if (authMode === "register") {
      return (
        <RegisterForm
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          loading={loading}
          error={error}
          success={success}
          usernameInputRef={usernameInputRef}
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleRegisterSubmit}
          onSwitchMode={switchMode}
        />
      );
    }

    if (authMode === "forgot") {
      return (
        <ForgotPasswordForm
          email={email}
          loading={loading}
          error={error}
          success={success}
          emailInputRef={emailInputRef}
          onEmailChange={setEmail}
          onSubmit={handleForgotSubmit}
          onSwitchMode={switchMode}
        />
      );
    }

    return (
      <LoginForm
        username={username}
        password={password}
        loading={loading}
        error={error}
        success={success}
        usernameInputRef={usernameInputRef}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleLoginSubmit}
        onSwitchMode={switchMode}
      />
    );
  }

  return (
    <div
      className={`login-panel auth-card auth-card-${authMode} fade-in`}
      style={{ animationDelay: fromHero ? "0.08s" : "0s" }}
    >
      {renderCurrentForm()}
    </div>
  );
}

export default AuthForm;
