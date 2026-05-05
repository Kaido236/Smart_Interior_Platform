import { useState } from "react";
import Button from "../components/common/Button.jsx";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Register submitted:", { username, email, password });
    alert(`Demo register submitted for: ${username || "unknown user"}`);
  }

  return (
    <section className="login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Create account</p>
        <h1>Đăng ký</h1>
        <p className="login-subtitle">
          Tạo tài khoản mock để chuẩn bị cho luồng xác thực thật sau này.
        </p>

        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        <Button className="full-width" type="submit">
          Đăng ký
        </Button>
      </form>
    </section>
  );
}

export default RegisterPage;
