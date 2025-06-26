import React from 'react';
import styled from 'styled-components';
import Container from '../../common/Container';
import { brands } from '../../../data/brands';

const BrandsSection = styled.section`
  padding: clamp(3rem, 5vw, 5rem) 0;
  background: white;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, var(--racing-green), #000000);
    border-radius: 2px;
  }
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const BrandCard = styled.div`
  width: 100%;
  max-width: 160px;
  aspect-ratio: 3/2;
  padding: 1.25rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--racing-green);
  }
`;

const BrandLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: all 0.3s ease;
  opacity: 0.9;
  image-rendering: auto;
  transform: scale(0.9);

  ${BrandCard}:hover & {
    opacity: 1;
    transform: scale(0.95);
  }
`;

const FallbackLogo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.1rem;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
`;

const Brands: React.FC = () => {
  return (
    <BrandsSection>
      <Container>
        <SectionTitle>Trusted Brands</SectionTitle>
        <BrandsGrid>
          {brands.map((brand) => (
            <BrandCard key={brand.id}>
              <BrandLogo
                src={brand.logo}
                alt={`${brand.name} logo`}
                title={brand.description}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-logo';
                    fallback.textContent = brand.name;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </BrandCard>
          ))}
        </BrandsGrid>
      </Container>
    </BrandsSection>
  );
};

export default Brands;
