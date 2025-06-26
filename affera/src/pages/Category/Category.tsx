import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import ProductGrid from '../../components/product/ProductGrid';
import { useCart } from '../../context/CartContext';
import { getProductsByCategory } from '../../data/products';
import Loading from '../../components/common/Loading';

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

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'tools':
      return 'Professional-grade tools for every job. From power tools to hand tools, find everything you need for your next project.';
    case 'plumbing':
      return 'Complete range of plumbing supplies and equipment. Quality products for both professional plumbers and DIY enthusiasts.';
    case 'construction':
      return 'Essential construction equipment and materials. Build with confidence using our premium construction supplies.';
    default:
      return 'Browse our selection of quality products.';
  }
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = React.useState(true);

  const products = React.useMemo(() => {
    if (!category) return [];
    return getProductsByCategory(category);
  }, [category]);

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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

  return (
    <CategoryWrapper>
      <Container>
        <CategoryHeader>
          <CategoryTitle>{category}</CategoryTitle>
          <CategoryDescription>
            {getCategoryDescription(category)}
          </CategoryDescription>
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
