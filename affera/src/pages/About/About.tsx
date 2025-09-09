import React from "react";
import styled from "styled-components";
import Container from "../../components/common/Container";
import { FiAward, FiUsers, FiTruck, FiShield } from "react-icons/fi";
import Hero from "../../components/home/Hero";
import Icon from "../../components/common/Icon";

const AboutWrapper = styled.div`
  min-height: 100vh;
`;

const ContentSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--racing-green);
    border-radius: 2px;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 4rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  margin-bottom: 2rem;
`;

const StoryContent = styled.div`
  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.7;
    color: #666;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StoryImage = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
  border: 2px dashed #ddd;

  @media (min-width: 768px) {
    height: 400px;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ValueCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--racing-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const StatsSection = styled.section`
  background: var(--racing-green);
  color: white;
  padding: clamp(4rem, 8vw, 6rem) 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #00ff7f;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: clamp(1rem, 2vw, 1.2rem);
  opacity: 0.9;
`;

/**previous hero: <HeroSection>
        <Container>
        <HeroTitle>About Affera</HeroTitle>
        <HeroSubtitle>
          Your trusted partner for professional tools and construction
          supplies. Building excellence since 2010 with quality products and
          exceptional service.
        </HeroSubtitle>
      </Container>
    </HeroSection>**/

const About: React.FC = () => {
  return (
    <AboutWrapper>
      <Hero></Hero>

      <ContentSection>
        <Container>
          <SectionTitle>About us</SectionTitle>
          <AboutGrid>
            <InfoCard>
              <StoryContent>
                <h3>Our Vision</h3>
                <p>
                  We are landscape architects and urban designers who create
                  climate-resilient, sociable places that bring communities
                  together. Our work spans from intimate garden spaces to
                  large-scale urban developments, always with sustainability and
                  social connection at the heart of our approach.
                </p>
                <h3>Our Approach</h3>
                <p>
                  We believe that great places are born from understanding the
                  unique character of each site and the needs of the people who
                  will use them. Our designs respond to local climate, ecology,
                  and culture while creating spaces that foster community
                  interaction and environmental resilience.
                </p>
                <h3>Our Impact</h3>
                <p>
                  From award-winning schools to transformative housing
                  developments, our projects demonstrate how thoughtful
                  landscape design can enhance quality of life, support
                  biodiversity, and create lasting value for communities across
                  the UK.
                </p>
              </StoryContent>
            </InfoCard>
            <InfoCard>
              <StoryImage>[Company History Image]</StoryImage>
            </InfoCard>
          </AboutGrid>

          <SectionTitle>Our Values</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueIcon>
                <Icon icon={FiAward} size={32} />
              </ValueIcon>
              <ValueTitle>Quality First</ValueTitle>
              <ValueDescription>
                We source only the highest quality products from trusted
                manufacturers and rigorously test everything we sell.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <Icon icon={FiUsers} size={32} />
              </ValueIcon>
              <ValueTitle>Customer Focus</ValueTitle>
              <ValueDescription>
                Our customers are at the center of everything we do. We provide
                expert advice and support to help you succeed.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <Icon icon={FiTruck} size={32} />
              </ValueIcon>
              <ValueTitle>Fast Delivery</ValueTitle>
              <ValueDescription>
                Quick and reliable delivery service ensures you get your tools
                and supplies when you need them most.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <Icon icon={FiShield} size={32} />
              </ValueIcon>
              <ValueTitle>Reliability</ValueTitle>
              <ValueDescription>
                Count on us for consistent quality, competitive pricing, and
                dependable service you can trust.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </Container>
      </ContentSection>

      <StatsSection>
        <Container>
          <SectionTitle style={{ color: "white" }}>Our Impact</SectionTitle>
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
              <StatNumber>13+</StatNumber>
              <StatLabel>Years of Experience</StatLabel>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>
    </AboutWrapper>
  );
};

export default About;
