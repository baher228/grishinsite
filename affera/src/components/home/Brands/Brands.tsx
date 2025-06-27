import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const BrandsSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  height: 200px;
  overflow: hidden;
`;

const SlideGroup = styled.div<{ $isActive: boolean; $index: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  opacity: ${props => props.$isActive ? 1 : 0};
  transform: translateX(${props => props.$index * 100}%);
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
`;

const BrandCard = styled.div`
  width: 220px;
  margin-top: 1rem;
  aspect-ratio: 3/2;
  padding: 1.5rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden; /* Prevent image overflow */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--racing-green);
  }
`;

const BrandLogo = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  transition: all 0.5s ease;
  opacity: 0.9;
  image-rendering: auto;
  transform: scale(0.8);

  ${BrandCard}:hover & {
    opacity: 1;
    transform: scale(0.88);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 2rem;
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  background: ${props => props.$isActive ? 'var(--primary-color)' : 'transparent'};
  cursor: pointer;
  transition: all 0.5s ease;
  padding: 0;

  &:hover {
    background: var(--primary-color);
    transform: scale(1.2);
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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Group brands into arrays of 4
  const brandGroups = brands.reduce((acc: typeof brands[], curr, i) => {
    if (i % 4 === 0) {
      acc.push(brands.slice(i, i + 4));
    }
    return acc;
  }, []);

  // Auto-switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brandGroups.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [brandGroups.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <BrandsSection>
      <Container>
        <SectionTitle>Trusted Brands</SectionTitle>
        <BrandsSlider>
          {brandGroups.map((group, groupIndex) => (
            <SlideGroup 
              key={groupIndex}
              $isActive={currentSlide === groupIndex}
              $index={groupIndex - currentSlide}
            >
              {group.map((brand) => (
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
            </SlideGroup>
          ))}
        </BrandsSlider>
        <DotsContainer>
          {brandGroups.map((_, index) => (
            <Dot
              key={index}
              $isActive={currentSlide === index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
      </Container>
    </BrandsSection>
  );
};

export default Brands;
