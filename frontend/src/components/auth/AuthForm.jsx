import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import { clearSession, saveSession } from "../../services/apiClient.js";
import { login, register } from "../../services/authService.js";

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

  async function runRequest(callback) {
    setLoading(true);
    clearFeedback();

    try {
      const nextRoute = await callback();
      setLoading(false);

      if (nextRoute) {
        navigate(nextRoute);
      }
    } catch (requestError) {
      clearSession();
      setLoading(false);
      setError(requestError.message || "Request failed.");
    }
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

    runRequest(async () => {
      const trimmedEmail = username.trim();

      if (!trimmedEmail || !password) {
        setError("Please enter your email and password.");
        return;
      }

      const response = await login(trimmedEmail, password);
      saveSession(response.accessToken, response.user);
      onLogin(response.user);
      return getSafeReturnPath();
    });
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    runRequest(async () => {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();

      if (!trimmedUsername || !trimmedEmail || !password) {
        setError("Please enter all required registration fields.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Password confirmation does not match.");
        return;
      }

      await register({
        fullName: trimmedUsername,
        email: trimmedEmail,
        password,
      });
      setUsername(trimmedEmail);
      onAuthModeChange("login");
      setPassword("");
      setConfirmPassword("");
      setSuccess("Account created successfully. Please sign in.");
    });
  }

  function handleForgotSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    runRequest(async () => {
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      setSuccess("Password reset is not enabled in this demo.");
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
