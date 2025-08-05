import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../../common/Container";
import Icon from "../../common/Icon";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const FooterWrapper = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
`;

const FooterContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FooterLink = styled(Link)`
  color: #a0a0a0;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const FooterText = styled.p`
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #a0a0a0;
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #a0a0a0;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterText>
            Feronova is your trusted source for professional construction and
            plumbing tools. We provide quality equipment for both professionals
            and DIY enthusiasts.
          </FooterText>

          <SocialLinks>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <Icon icon={FiFacebook} size={24} />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <Icon icon={FiInstagram} size={24} />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <Icon icon={FiTwitter} size={24} />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/Bath & Plumbing">BATHROOM & PLUMBING</FooterLink>
          <FooterLink to="/Landscaping">LANDSCAPING</FooterLink>
          <FooterLink to="/Storage & Shelving">STORAGE & SHELVING</FooterLink>
          <FooterLink to="/Lighting">LIGHTING</FooterLink>
          <FooterLink to="/Doors & Security">DOORS & SECURITY</FooterLink>
          <FooterLink to="/Screws & Fixings">SCREWS & FIXINGS</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/shipping">Shipping Information</FooterLink>
          <FooterLink to="/returns">Returns & Refunds</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>
            Subscribe to our newsletter for the latest updates, exclusive
            offers, and expert tips.
          </FooterText>
          {/* Newsletter form could be added here */}
        </FooterSection>
      </FooterContainer>
      <Copyright>
        <Container>
          © {new Date().getFullYear()} Feronova. All rights reserved.
        </Container>
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
