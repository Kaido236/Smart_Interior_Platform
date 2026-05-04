function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="nav-content">
        <button className="brand-button" onClick={() => onNavigate("home")}>
          Smart Interior
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          <button
            className={currentPage === "home" ? "nav-button active" : "nav-button"}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>
          <button
            className={
              currentPage === "products" || currentPage === "productDetail"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => onNavigate("products")}
          >
            Products
          </button>
          <button
            className={currentPage === "login" ? "nav-button active" : "nav-button"}
            onClick={() => onNavigate("login")}
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
