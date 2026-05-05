import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button.jsx";

function LoginPage({ user, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      alert("Please enter a username.");
      return;
    }

    console.log("Login submitted:", { username: trimmedUsername, password });
    onLogin(trimmedUsername);
    alert(`Demo login submitted for: ${trimmedUsername}`);
    navigate("/");
  }

  return (
    <section className="login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Demo access</p>
        <h1>{user ? "You are signed in" : "Welcome back"}</h1>
        <p className="login-subtitle">
          {user
            ? `Current mock user: ${user.displayName || user.username}`
            : "Sign in with any username and password to test the frontend flow."}
        </p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        <Button className="full-width" type="submit">
          Login
        </Button>
      </form>
    </section>
  );
}

export default LoginPage;
