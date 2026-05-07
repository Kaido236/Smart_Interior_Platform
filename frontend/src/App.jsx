import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import SellProductPage from "./pages/SellProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import MyProductsPage from "./pages/MyProductsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { clearSession } from "./services/apiClient.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("smartInteriorUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        clearSession();
      }
    }
  }, []);

  function handleLogin(nextUser) {
    setUser(nextUser);
  }

  function handleLogout() {
    clearSession();
    setUser(null);
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shop" element={<Navigate to="/products" replace />} />
          <Route path="/products/sell" element={<SellProductPage />} />
          <Route path="/shop/sell" element={<Navigate to="/products/sell" replace />} />
          <Route path="/products/my" element={<MyProductsPage />} />
          <Route path="/shop/my-products" element={<Navigate to="/products/my" replace />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/shop/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop/cart" element={<Navigate to="/cart" replace />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shop/orders" element={<Navigate to="/orders" replace />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage user={user} onLogin={handleLogin} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
