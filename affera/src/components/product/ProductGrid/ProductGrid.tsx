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

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
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

  /* --- Mobile: exactly two columns and tight gaps so both fit --- */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 0 0px;
  }

  @media (max-width: 420px) {
    gap: 8px;
    padding: 0 0px;
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
