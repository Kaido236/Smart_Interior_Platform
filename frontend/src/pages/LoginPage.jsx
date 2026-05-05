import { useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthForm from "../components/auth/AuthForm.jsx";

function LoginPage({ onLogin }) {
  const location = useLocation();
  const fromHero = location.state?.fromHero === true;
  const returnTo = location.state?.from?.pathname || location.state?.returnTo || "/";

  return (
    <AuthLayout>
      <AuthForm onLogin={onLogin} fromHero={fromHero} returnTo={returnTo} />
    </AuthLayout>
  );
}

export default LoginPage;
