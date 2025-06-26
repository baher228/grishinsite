import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/common/Container';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import Icon from '../../components/common/Icon';

const ContactWrapper = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: clamp(4rem, 8vw, 6rem) 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3CB371, #00FF7F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: #666;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`;

const ContactCards = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ContactCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3CB371, #00FF7F);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CardContent = styled.div`
  color: #666;
  line-height: 1.6;

  a {
    color: #3CB371;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.div`
  background: white;
  border-radius: 20px;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;

  h2 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #3CB371;
    background: white;
    box-shadow: 0 0 0 3px rgba(60, 179, 113, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3CB371;
    background: white;
    box-shadow: 0 0 0 3px rgba(60, 179, 113, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #666;
  z-index: 1;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3CB371, #2E8B57);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(60, 179, 113, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MapSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: #f8f9fa;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
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
    background: linear-gradient(135deg, #3CB371, #00FF7F);
    border-radius: 2px;
  }
`;

const MapPlaceholder = styled.div`
  background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
  border-radius: 20px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
  border: 2px dashed #ddd;
  margin-top: 2rem;
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Contact form submitted:', formData);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <ContactWrapper>
      <HeroSection>
        <Container>
          <HeroTitle>Get in Touch</HeroTitle>
          <HeroSubtitle>
            Have questions about our products or need expert advice? 
            We're here to help you find the right tools for your project.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfo>
              <h2>Contact Information</h2>
              <p>
                Reach out to us through any of the channels below. Our team is ready to assist 
                you with product inquiries, technical support, or any questions you may have.
              </p>

              <ContactCards>
                <ContactCard>
                  <CardHeader>
                    <CardIcon>
                      <Icon icon={FiPhone} size={20} />
                    </CardIcon>
                    <CardTitle>Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Sales: <a href="tel:+1234567890">+1 (234) 567-8900</a></p>
                    <p>Support: <a href="tel:+1234567891">+1 (234) 567-8901</a></p>
                  </CardContent>
                </ContactCard>

                <ContactCard>
                  <CardHeader>
                    <CardIcon>
                      <Icon icon={FiMail} size={20} />
                    </CardIcon>
                    <CardTitle>Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>General: <a href="mailto:info@affera.com">info@affera.com</a></p>
                    <p>Support: <a href="mailto:support@affera.com">support@affera.com</a></p>
                  </CardContent>
                </ContactCard>

                <ContactCard>
                  <CardHeader>
                    <CardIcon>
                      <Icon icon={FiMapPin} size={20} />
                    </CardIcon>
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>123 Industrial Drive<br />
                    Construction City, CC 12345<br />
                    United States</p>
                  </CardContent>
                </ContactCard>

                <ContactCard>
                  <CardHeader>
                    <CardIcon>
                      <Icon icon={FiClock} size={20} />
                    </CardIcon>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed</p>
                  </CardContent>
                </ContactCard>
              </ContactCards>
            </ContactInfo>

            <ContactForm>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <Form onSubmit={handleSubmit}>
                <InputRow>
                  <InputGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Icon icon={FiUser} size={18} />
                      </InputIcon>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </InputWrapper>
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Icon icon={FiUser} size={18} />
                      </InputIcon>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </InputWrapper>
                  </InputGroup>
                </InputRow>

                <InputRow>
                  <InputGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Icon icon={FiMail} size={18} />
                      </InputIcon>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </InputWrapper>
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Icon icon={FiPhone} size={18} />
                      </InputIcon>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </InputWrapper>
                  </InputGroup>
                </InputRow>

                <InputGroup>
                  <Label htmlFor="subject">Subject</Label>
                  <InputWrapper>
                    <InputIcon>
                      <Icon icon={FiMessageSquare} size={18} />
                    </InputIcon>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What can we help you with?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </InputWrapper>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="message">Message</Label>
                  <InputWrapper>
                    <InputIcon>
                      <Icon icon={FiMessageSquare} size={18} />
                    </InputIcon>
                    <TextArea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </InputWrapper>
                </InputGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                  <Icon icon={FiSend} size={18} />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </SubmitButton>
              </Form>
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>

      <MapSection>
        <Container>
          <SectionTitle>Find Us</SectionTitle>
          <MapPlaceholder>
            [Interactive Map - Google Maps Integration]
          </MapPlaceholder>
        </Container>
      </MapSection>
    </ContactWrapper>
  );
};

export default Contact;
