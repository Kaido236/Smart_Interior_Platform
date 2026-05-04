import { useState } from "react";
import Button from "../components/common/Button.jsx";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Demo only: replace this with backend authentication later.
    console.log("Login submitted:", { username, password });
    alert(`Demo login submitted for: ${username || "unknown user"}`);
  }

  return (
    <section className="login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Demo access</p>
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Sign in with any username and password to test the frontend flow.
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
