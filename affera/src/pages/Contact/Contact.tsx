import React from "react";
import styled from "styled-components";
import Container from "../../components/common/Container";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Icon from "../../components/common/Icon";

const ContactWrapper = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: var(--racing-green);
  color: white;
  padding: clamp(4rem, 8vw, 8rem) 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
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

const ContactGrid = styled.div`
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

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  color: var(--racing-green);
  font-size: 2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  font-size: 1.05rem;
  color: #333;
  line-height: 1.6;
`;

const ContactFormCard = styled(InfoCard)`
  margin-bottom: 0;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3cb371;
    background: white;
    box-shadow: 0 0 0 3px rgba(60, 179, 113, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: #f8f9fa;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3cb371;
    background: white;
    box-shadow: 0 0 0 3px rgba(60, 179, 113, 0.1);
  }
`;

const SubmitButton = styled.button`
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
  margin-top: 0.5rem;

  &:hover {
    background: #003319;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 66, 37, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactWrapper>
      <HeroSection>
        <Container>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>
            We're here to help! Reach out to our team for any questions,
            support, or business inquiries.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Get in Touch</SectionTitle>
          <ContactGrid>
            <InfoCard>
              <InfoItem>
                <InfoIcon>
                  <Icon icon={FiMail} size={28} />
                </InfoIcon>
                <InfoContent>
                  <strong>Email:</strong>
                  <br />
                  support@feronova.co.uk
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <Icon icon={FiPhone} size={28} />
                </InfoIcon>
                <InfoContent>
                  <strong>Phone:</strong>
                  <br />
                  +1 (555) 123-4567
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <Icon icon={FiMapPin} size={28} />
                </InfoIcon>
                <InfoContent>
                  <strong>Address:</strong>
                  <br />
                  123 Main Street, London, UK
                </InfoContent>
              </InfoItem>
            </InfoCard>
            <ContactFormCard>
              <ContactForm>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required />
                </div>
                <SubmitButton type="submit">Send Message</SubmitButton>
              </ContactForm>
            </ContactFormCard>
          </ContactGrid>
        </Container>
      </ContentSection>
    </ContactWrapper>
  );
};

export default Contact;
