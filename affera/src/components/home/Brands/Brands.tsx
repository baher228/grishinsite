import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '../../common/Container';
import { brands } from '../../../data/brands';

const BrandsSection = styled.section`
  padding: clamp(3rem, 5vw, 5rem) 0;
  background: white;
  position: relative;
  overflow: hidden;
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

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const BrandsSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  height: 200px;
  overflow: hidden;
`;

const BrandsTrack = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
  animation: ${slide} 30s linear infinite;
  will-change: transform;
`;

const BrandCard = styled.div`
  width: 220px;
  margin-top: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
  aspect-ratio: 3/2;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
`;

const BrandLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: all 0.5s ease;
  opacity: 0.9;
  image-rendering: auto;
  transform: scale(1.2);
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
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate brands array for seamless infinite scroll
  const logos = [...brands, ...brands];

  

  return (
    <BrandsSection>
      <Container>
        <SectionTitle>Our Trusted Brands</SectionTitle>
        <BrandsSlider>
          <BrandsTrack ref={trackRef}>
            {logos.map((brand, idx) => (
              <BrandCard key={`${brand.id}-${idx}`}>
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
                    if (parent && !parent.querySelector('.fallback-logo')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-logo';
                      fallback.textContent = brand.name;
                      fallback.style.cssText = `
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
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </BrandCard>
            ))}
          </BrandsTrack>
        </BrandsSlider>
      </Container>
    </BrandsSection>
  );
};

export default Brands;
