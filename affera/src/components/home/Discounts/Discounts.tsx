import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { discounts, Discount } from '../../../data/discounts';

const BannerSection = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const BannerSlide = styled.div<{ $isActive: boolean; $backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ), url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 1s ease-in-out;
  z-index: ${props => props.$isActive ? 2 : 1};
`;

const BannerContent = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`;

const BannerSubtitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 5.5rem;
  }
`;

const BannerDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;



const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const Discounts: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use only first 4 discounts as requested
  const bannerDiscounts = discounts.slice(0, 4);

  // Background images for each banner (you can replace these with actual images)
  const backgroundImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Modern living room
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Tools workspace
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Kitchen/plumbing
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Home improvement
  ];

  // Auto-switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerDiscounts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerDiscounts.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

 

  return (
    <BannerSection>
      {bannerDiscounts.map((discount, index) => (
        <BannerSlide
          key={discount.id}
          $isActive={currentSlide === index}
          $backgroundImage={backgroundImages[index]}
        >
          <BannerContent>
            <BannerSubtitle>
              {discount.title.toUpperCase()}
            </BannerSubtitle>
            <BannerTitle>
              Up To {discount.percentage}% Off
            </BannerTitle>
            <BannerDescription>
              {discount.description}. Use code <strong>{discount.code}</strong> at checkout to enjoy this exclusive offer.
            </BannerDescription>
            
          </BannerContent>
        </BannerSlide>
      ))}
      
      <DotsContainer>
        {bannerDiscounts.map((_, index) => (
          <Dot
            key={index}
            $isActive={currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </BannerSection>
  );
};

export default Discounts;
