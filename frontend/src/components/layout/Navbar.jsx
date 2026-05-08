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
  const displayName = user?.fullName || user?.displayName || user?.email || user?.username;

  return (
    <header className={isHomePage ? "navbar navbar-overlay" : "navbar navbar-solid"}>
      <div className="nav-content">
        <NavLink className="brand-link" to="/">
          Smart Interior
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className="nav-link" to="/products">
            Shop
          </NavLink>
          <NavLink className="nav-link" to="/products/sell">
            Sell
          </NavLink>
          <NavLink className="nav-link" to="/products/my">
            My Products
          </NavLink>
          <NavLink className="nav-link" to="/orders">
            Orders
          </NavLink>
          <NavLink className="nav-link" to="/community">
            Community
          </NavLink>
          <NavLink className="nav-link" to="/blog">
            Blog
          </NavLink>
        </nav>

        <div className="nav-actions" aria-label="User actions">
          <NavLink className="nav-icon-button" to="/cart" aria-label="Cart">
            <CartIcon />
          </NavLink>
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
            <NavLink className="auth-link auth-login" to="/login">
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
