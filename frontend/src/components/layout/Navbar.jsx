import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-content">
        <NavLink className="brand-link" to="/">
          <span className="brand-mark">SI</span>
          <span>Smart Interior</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className="nav-link" to="/" end>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/products">
            Products
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
