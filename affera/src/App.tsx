import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductGrid from './components/product/ProductGrid';
import { CartProvider, useCart } from './context/CartContext';
import { getProductsByCategory, sampleProducts } from './data/products';

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
  const toolsProducts = getProductsByCategory('tools');
  
  return (
    <ProductGrid 
      products={toolsProducts}
      onAddToCart={addItem}
      title="Tools"
    />
  );
};

const Plumbing: React.FC = () => {
  const { addItem } = useCart();
  const plumbingProducts = getProductsByCategory('plumbing');
  
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
  const constructionProducts = getProductsByCategory('construction');
  
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
  const saleProducts = sampleProducts.filter(product => product.originalPrice);
  
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
            </Routes>
          </Main>
          <Footer />
        </AppWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;
