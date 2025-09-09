import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import Icon from "../../common/Icon";
import Container from "../../common/Container";

const HeroSection = styled.section`
  background: var(--racing-green);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--racing-green);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    min-height: 250px;
    padding: 0 1rem;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(Link)`
  background: white;
  color: var(--racing-green);
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background: var(--racing-green);
    color: white;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;

  &:hover {
    background: white;
    border-color: white;
    color: var(--racing-green);
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <Container>
        <HeroContent>
          <Badge>
            <Icon icon={FiShield} size={14} />
            Quality Guaranteed
          </Badge>

          <Title>Professional supplies for Every Project</Title>

          <Subtitle>
            Your trusted partner for professional tools and construction
            supplies. Quality equipment for professionals and DIY enthusiasts.
          </Subtitle>

          <ButtonGroup>
            <PrimaryButton to="/products">
              Shop Now
              <span>→</span>
            </PrimaryButton>
            <SecondaryButton to="/brands">View Brands</SecondaryButton>
          </ButtonGroup>

          <StatsGrid>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Products</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Brands</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>Fast</StatNumber>
              <StatLabel>Delivery</StatLabel>
            </StatItem>
          </StatsGrid>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
