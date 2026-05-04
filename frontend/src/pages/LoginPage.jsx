import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Demo only: replace this with backend login later.
    console.log("Login submitted:", { username, password });
    alert(`Demo login submitted for: ${username || "unknown user"}`);
  }

  return (
    <section className="page-section login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Demo access</p>
        <h1>Login</h1>

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

        <button className="primary-button full-width" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
