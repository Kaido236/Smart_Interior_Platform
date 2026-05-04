import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleNavigate(page) {
    setCurrentPage(page);
    setSelectedProduct(null);
  }

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setCurrentPage("productDetail");
  }

  function handleBackToProducts() {
    setSelectedProduct(null);
    setCurrentPage("products");
  }

  function renderPage() {
    if (currentPage === "products") {
      return <ProductsPage onSelectProduct={handleSelectProduct} />;
    }

    if (currentPage === "productDetail") {
      return (
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBackToProducts}
        />
      );
    }

    if (currentPage === "login") {
      return <LoginPage />;
    }

    return <HomePage onNavigate={handleNavigate} />;
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
