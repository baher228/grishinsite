import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import Discounts from '../../components/home/Discounts';
import Brands from '../../components/home/Brands';
import ProductGrid from '../../components/product/ProductGrid';
import Container from '../../components/common/Container';
import { useCart } from '../../context/CartContext';
import { getFeaturedProducts } from '../../data/products';
import { FiTool, FiDroplet, FiSettings, FiHome, FiLock, FiPackage } from 'react-icons/fi';
import Icon from '../../components/common/Icon';
import { Link } from 'react-router-dom';

const HomeWrapper = styled.div`
  min-height: 100vh;
`;

const FeaturedSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
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

const CategoriesSection = styled.section`
  padding: clamp(3rem, 5vw, 5rem) 0;
  background: white;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(2rem, 4vw, 3rem);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(2.5rem, 5vw, 4rem);
  }
`;

const CategoryCard = styled(Link)`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: clamp(16px, 2vw, 20px);
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    border-color: var(--racing-green);
  }

  @media (min-width: 1440px) {
    padding: clamp(3rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem);
  }
`;

const CategoryIcon = styled.div`
  width: clamp(60px, 8vw, 80px);
  height: clamp(60px, 8vw, 80px);
  background: linear-gradient(135deg, var(--racing-green), #000000);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  transition: all 0.3s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 66, 37, 0.3);
  }

  @media (min-width: 1440px) {
    width: clamp(80px, 6vw, 100px);
    height: clamp(80px, 6vw, 100px);
    font-size: clamp(2rem, 3vw, 2.5rem);
  }
`;

const CategoryTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;

  @media (min-width: 1440px) {
    font-size: clamp(1.5rem, 2.5vw, 1.75rem);
  }
`;

const CategoryDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.5vw, 1rem);

  @media (min-width: 1440px) {
    font-size: clamp(1rem, 1.8vw, 1.1rem);
    line-height: 1.7;
  }
`;

const StatsSection = styled.section`
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: #1a1a1a;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 66, 37, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
    pointer-events: none;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(2rem, 4vw, 3rem);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    gap: clamp(3rem, 5vw, 4rem);
  }
`;

const StatCard = styled.div`
  padding: clamp(1.5rem, 3vw, 2rem) 1rem;

  @media (min-width: 1440px) {
    padding: clamp(2rem, 4vw, 3rem) 1rem;
  }
`;

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #004225;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;

  @media (min-width: 1440px) {
    font-size: clamp(3.5rem, 6vw, 5rem);
  }
`;

const StatLabel = styled.div`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  opacity: 0.9;
  font-weight: 400;
  position: relative;
  z-index: 1;

  @media (min-width: 1440px) {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
  }
`;

const NewsletterSection = styled.section`
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: #f8f9fa;
  text-align: center;
  position: relative;
`;

const NewsletterTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const NewsletterDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #666;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--racing-green);
    box-shadow: 0 0 0 3px rgba(0, 66, 37, 0.1);
  }
`;

const NewsletterButton = styled.button`
  background: var(--racing-green);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #003319;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 66, 37, 0.3);
  }
`;

const Home: React.FC = () => {
  const { addItem } = useCart();
  const featuredProducts = getFeaturedProducts();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
  };

  return (
    <HomeWrapper>
      <Hero />
      
      <Discounts />
      
      <FeaturedSection>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductGrid 
            products={featuredProducts}
            onAddToCart={addItem}
          />
        </Container>
      </FeaturedSection>

      <Brands />

      <CategoriesSection>
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            <CategoryCard to="/bathroom-plumbing">
              <CategoryIcon>
                <Icon icon={FiDroplet} size={32} />
              </CategoryIcon>
              <CategoryTitle>Bathroom & Plumbing</CategoryTitle>
              <CategoryDescription>
                Complete range of bathroom fixtures and plumbing supplies. Pipes, fittings, and repair kits for all your needs.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/landscaping">
              <CategoryIcon>
                <Icon icon={FiTool} size={32} />
              </CategoryIcon>
              <CategoryTitle>Landscaping</CategoryTitle>
              <CategoryDescription>
                Garden tools, outdoor equipment, and landscaping supplies to create and maintain beautiful outdoor spaces.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/storage">
              <CategoryIcon>
                <Icon icon={FiPackage} size={32} />
              </CategoryIcon>
              <CategoryTitle>Storage & Shelving</CategoryTitle>
              <CategoryDescription>
                Organize your space with our selection of storage solutions, shelving units, and organizational systems.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/lighting">
              <CategoryIcon>
                <Icon icon={FiHome} size={32} />
              </CategoryIcon>
              <CategoryTitle>Lighting</CategoryTitle>
              <CategoryDescription>
                Indoor and outdoor lighting solutions. From LED bulbs to decorative fixtures for every room and space.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/security">
              <CategoryIcon>
                <Icon icon={FiLock} size={32} />
              </CategoryIcon>
              <CategoryTitle>Doors & Security</CategoryTitle>
              <CategoryDescription>
                Secure your property with our range of door locks, security systems, and safety equipment.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/screws">
              <CategoryIcon>
                <Icon icon={FiSettings} size={32} />
              </CategoryIcon>
              <CategoryTitle>Screws & Fixings</CategoryTitle>
              <CategoryDescription>
                Essential fasteners, screws, bolts, and fixing solutions for all your construction and repair projects.
              </CategoryDescription>
            </CategoryCard>
          </CategoriesGrid>
        </Container>
      </CategoriesSection>

      <StatsSection>
        <Container>
          <StatsGrid>
            <StatCard>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Happy Customers</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>500+</StatNumber>
              <StatLabel>Quality Products</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50+</StatNumber>
              <StatLabel>Trusted Brands</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Customer Support</StatLabel>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

      <NewsletterSection>
        <Container>
          <NewsletterTitle>Stay Updated</NewsletterTitle>
          <NewsletterDescription>
            Subscribe to our newsletter for the latest updates, exclusive offers, and expert tips.
          </NewsletterDescription>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput 
              type="email" 
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </Container>
      </NewsletterSection>
    </HomeWrapper>
  );
};

export default Home;
