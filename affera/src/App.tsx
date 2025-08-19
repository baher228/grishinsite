import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import ProductGrid from "./components/product/ProductGrid";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import { CartProvider, useCart } from "./context/CartContext";
import { getProductsByCategory, sampleProducts } from "./data/products";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/Admin/Login/LoginPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminRedirect from "./pages/Admin/AdminRedirect";

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

// Category page components
const Tools: React.FC = () => {
  const { addItem } = useCart();
  const toolsProducts = getProductsByCategory("tools");

  return (
    <ProductGrid products={toolsProducts} onAddToCart={addItem} title="Tools" />
  );
};

const Plumbing: React.FC = () => {
  const { addItem } = useCart();
  const plumbingProducts = getProductsByCategory("plumbing");

  return (
    <ProductGrid
      products={plumbingProducts}
      onAddToCart={addItem}
      title="Plumbing"
    />
  );
};

const Construction: React.FC = () => {
  const { addItem } = useCart();
  const constructionProducts = getProductsByCategory("construction");

  return (
    <ProductGrid
      products={constructionProducts}
      onAddToCart={addItem}
      title="Construction"
    />
  );
};

const Brands: React.FC = () => {
  const { addItem } = useCart();

  return (
    <ProductGrid
      products={sampleProducts}
      onAddToCart={addItem}
      title="All Brands"
    />
  );
};

const Sale: React.FC = () => {
  const { addItem } = useCart();
  const saleProducts = sampleProducts.filter(
    (product) => product.originalPrice
  );

  return (
    <ProductGrid
      products={saleProducts}
      onAddToCart={addItem}
      title="Sale Items"
    />
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppWrapper>
          <GlobalStyles />
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/plumbing" element={<Plumbing />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/:category" element={<Category />} />
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<PrivateRoute />}>
                <Route index element={<AdminDashboard />} />
              </Route>
            </Routes>
          </Main>
          <Footer />
        </AppWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;
