import { NavLink, useLocation } from "react-router-dom";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 5h2l2 10h9l2-7H7" />
      <path d="M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3v-4Z" />
      <path d="M10 20h4" />
    </svg>
  );
}

function Navbar({ user, onLogout }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const displayName = user?.displayName || user?.username;

  return (
    <header className={isHomePage ? "navbar navbar-overlay" : "navbar navbar-solid"}>
      <div className="nav-content">
        <NavLink className="brand-link" to="/">
          <span>Smart Interior</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className="nav-link" to="/draft">
            My Draft
          </NavLink>
          <NavLink className="nav-link" to="/products">
            Shop
          </NavLink>
          <NavLink className="nav-link" to="/how-it-works">
            How It Works
          </NavLink>
          <NavLink className="nav-link" to="/portfolio">
            Portfolio
          </NavLink>
          <NavLink className="nav-link" to="/blog">
            Blog
          </NavLink>
        </nav>

        <div className="nav-actions" aria-label="User actions">
          <button className="nav-icon-button" type="button" aria-label="Cart">
            <CartIcon />
          </button>
          <button className="nav-icon-button" type="button" aria-label="Notifications">
            <BellIcon />
          </button>
          {user ? (
            <div className="nav-auth">
              <span className="nav-user">Welcome {displayName}</span>
              <button className="logout-button" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink className="nav-user" to="/login">
              Login
            </NavLink>
          )}
          <button className="language-button" type="button">
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
