import React, { useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight, FiTag } from 'react-icons/fi';
import Container from '../../common/Container';
import Icon from '../../common/Icon';
import { discounts, Discount } from '../../../data/discounts';

const DiscountsSection = styled.section`
  padding: clamp(3rem, 5vw, 5rem) 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
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

const DiscountsContainer = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const DiscountCard = styled.div`
  min-width: 280px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    border-color: var(--racing-green);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, var(--racing-green), #000000);
  }

  @media (min-width: 768px) {
    min-width: 320px;
    padding: 2.5rem 2rem;
  }
`;

const DiscountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--racing-green), #000000);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DiscountPercentage = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--racing-green);
  line-height: 1;
  margin-bottom: 0.5rem;

  &::after {
    content: '%';
    font-size: 1.5rem;
    margin-left: 0.2rem;
  }
`;

const DiscountTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
`;

const DiscountDescription = styled.p`
  color: var(--text-color);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const DiscountCode = styled.div`
  background: #f8f9fa;
  border: 2px dashed var(--border-color);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const ClaimButton = styled.button`
  width: 100%;
  background: var(--racing-green);
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;

  &:hover {
    background: #003319;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 66, 37, 0.3);
  }
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction}: -20px;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: var(--racing-green);
    background: var(--racing-green);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Discounts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleClaimDiscount = (discount: Discount) => {
    // Handle discount claim logic here
    console.log('Claiming discount:', discount.code);
  };

  return (
    <DiscountsSection>
      <Container>
        <SectionTitle>Special Offers</SectionTitle>
        <DiscountsContainer>
          <NavigationButton 
            direction="left" 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <Icon icon={FiChevronLeft} size={20} />
          </NavigationButton>
          
          <ScrollContainer ref={scrollContainerRef}>
            {discounts.map((discount) => (
              <DiscountCard key={discount.id}>
                <DiscountBadge>
                  <Icon icon={FiTag} size={14} />
                  Limited Time
                </DiscountBadge>
                
                <DiscountPercentage>
                  {discount.percentage}
                </DiscountPercentage>
                
                <DiscountTitle>{discount.title}</DiscountTitle>
                <DiscountDescription>{discount.description}</DiscountDescription>
                
                <DiscountCode>
                  Code: {discount.code}
                </DiscountCode>
                
                <ClaimButton onClick={() => handleClaimDiscount(discount)}>
                  Claim Offer
                </ClaimButton>
              </DiscountCard>
            ))}
          </ScrollContainer>
          
          <NavigationButton 
            direction="right" 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <Icon icon={FiChevronRight} size={20} />
          </NavigationButton>
        </DiscountsContainer>
      </Container>
    </DiscountsSection>
  );
};

export default Discounts;
