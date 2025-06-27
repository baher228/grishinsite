import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import ProductGrid from '../../components/product/ProductGrid';
import { useCart } from '../../context/CartContext';
import { getProductsByCategory } from '../../services/api';
import Loading from '../../components/common/Loading';
import { Product } from '../../components/product/ProductCard';

const CategoryWrapper = styled.div`
  padding: 2rem 0;
  min-height: 60vh;
`;

const CategoryHeader = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const CategoryDescription = styled.p`
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;



const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedProducts = await getProductsByCategory(category);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (!category) {
    return (
      <CategoryWrapper>
        <Container>
          <NoProducts>Category not found</NoProducts>
        </Container>
      </CategoryWrapper>
    );
  }

  if (isLoading) {
    return (
      <CategoryWrapper>
        <Container>
          <Loading text="Loading products..." />
        </Container>
      </CategoryWrapper>
    );
  }

  if (error) {
    return (
      <CategoryWrapper>
        <Container>
          <NoProducts>{error}</NoProducts>
        </Container>
      </CategoryWrapper>
    );
  }

  return (
    <CategoryWrapper>
      <Container>
        <CategoryHeader>
          <CategoryTitle>{category}</CategoryTitle>

        </CategoryHeader>

        {products.length > 0 ? (
          <ProductGrid products={products} onAddToCart={addItem} />
        ) : (
          <NoProducts>
            No products found in this category
          </NoProducts>
        )}
      </Container>
    </CategoryWrapper>
  );
};

export default CategoryPage;
