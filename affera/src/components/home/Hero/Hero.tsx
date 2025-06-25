import React from 'react';
import styled from 'styled-components';
import Container from '../../common/Container';

const HeroWrapper = styled.section`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #ecf0f1;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, var(--accent-color) 0%, #e74c3c 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.6);
    background: linear-gradient(135deg, #e74c3c 0%, var(--accent-color) 100%);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <Container>
        <HeroContent>
          <HeroTitle>Professional Tools for Every Project</HeroTitle>
          <HeroSubtitle>
            Discover our extensive collection of construction and plumbing tools. 
            Quality equipment for professionals and DIY enthusiasts.
          </HeroSubtitle>
          <CTAButton>Shop Now</CTAButton>
        </HeroContent>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;
