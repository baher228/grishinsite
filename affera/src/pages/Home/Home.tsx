import React from 'react';
import Hero from '../../components/home/Hero';
import ProductGrid from '../../components/product/ProductGrid';
import { getFeaturedProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';

const Home: React.FC = () => {
  const { addItem } = useCart();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />
      <ProductGrid 
        products={featuredProducts}
        onAddToCart={addItem}
        title="Featured Products"
      />
    </>
  );
};

export default Home;
