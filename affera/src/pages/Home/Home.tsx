import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import ProductGrid from '../../components/product/ProductGrid';
import Container from '../../components/common/Container';
import { useCart } from '../../context/CartContext';
import { getFeaturedProducts } from '../../data/products';
import { FiTool, FiDroplet, FiSettings } from 'react-icons/fi';
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
    background: linear-gradient(135deg, var(--accent-color), #e53e3e);
    border-radius: 2px;
  }
`;

const CategoriesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CategoryCard = styled(Link)`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    border-color: var(--accent-color);
  }
`;

const CategoryIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-color), #e53e3e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CategoryDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, #333 100%);
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  padding: 2rem 1rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const NewsletterSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const NewsletterDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const NewsletterButton = styled.button`
  background: linear-gradient(135deg, var(--accent-color), #e53e3e);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
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
      
      <FeaturedSection>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductGrid 
            products={featuredProducts}
            onAddToCart={addItem}
          />
        </Container>
      </FeaturedSection>

      <CategoriesSection>
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            <CategoryCard to="/tools">
              <CategoryIcon>
                <Icon icon={FiTool} size={32} />
              </CategoryIcon>
              <CategoryTitle>Professional Tools</CategoryTitle>
              <CategoryDescription>
                High-quality power tools and hand tools for every project. From drills to saws, find the right tool for the job.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/plumbing">
              <CategoryIcon>
                <Icon icon={FiDroplet} size={32} />
              </CategoryIcon>
              <CategoryTitle>Plumbing Supplies</CategoryTitle>
              <CategoryDescription>
                Complete range of plumbing equipment and supplies. Pipes, fittings, and repair kits for all your plumbing needs.
              </CategoryDescription>
            </CategoryCard>

            <CategoryCard to="/construction">
              <CategoryIcon>
                <Icon icon={FiSettings} size={32} />
              </CategoryIcon>
              <CategoryTitle>Construction Equipment</CategoryTitle>
              <CategoryDescription>
                Essential construction materials and safety equipment. Build with confidence using our premium supplies.
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
