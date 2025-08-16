import React from "react";
import styled from "styled-components";
import ProductCard, { Product } from "../ProductCard";
import Container from "../../common/Container";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title?: string;
}

const GridSection = styled.section`
  padding: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #666;
  font-size: 1.1rem;
`;

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  title,
}) => {
  if (products.length === 0) {
    return (
      <GridSection>
        <Container>
          {title && <SectionTitle>{title}</SectionTitle>}
          <EmptyState>No products found</EmptyState>
        </Container>
      </GridSection>
    );
  }

  return (
    <GridSection>
      <Container>
        {title && <SectionTitle>{title}</SectionTitle>}
        <Grid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </Grid>
      </Container>
    </GridSection>
  );
};

export default ProductGrid;
