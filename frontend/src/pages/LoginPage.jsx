import { useLocation } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm.jsx";

function LoginPage({ user, onLogin }) {
  const location = useLocation();
  const fromHero = location.state?.fromHero === true;

  return (
    <section className="login-page">
      <AuthForm user={user} onLogin={onLogin} fromHero={fromHero} />
    </section>
  );
}

export default LoginPage;
