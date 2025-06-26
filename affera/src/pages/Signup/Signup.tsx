import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import Icon from '../../components/common/Icon';

const SignupWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const SignupCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: clamp(2rem, 5vw, 3rem);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: clamp(3rem, 6vw, 4rem);
  }
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(0.9rem, 2vw, 1rem);
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

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  z-index: 1;

  &:hover {
    color: #3CB371;
  }
`;

const PasswordStrength = styled.div<{ strength: number }>`
  margin-top: 0.5rem;
  height: 4px;
  background: #e1e5e9;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.strength}%;
    background: ${props => 
      props.strength < 25 ? '#dc3545' :
      props.strength < 50 ? '#fd7e14' :
      props.strength < 75 ? '#ffc107' : '#28a745'
    };
    transition: all 0.3s ease;
  }
`;

const PasswordHint = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
    margin-top: 0.25rem;
  }
  
  label {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
    line-height: 1.4;
    
    a {
      color: #3CB371;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SignupButton = styled.button`
  background: linear-gradient(135deg, #3CB371, #2E8B57);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e5e9;
  }
  
  span {
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  
  a {
    color: #3CB371;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup attempt:', formData);
    }, 1000);
  };

  return (
    <SignupWrapper>
      <Container>
        <SignupCard>
          <Title>Create Account</Title>
          <Subtitle>Join us and start shopping for quality tools</Subtitle>
          
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <InputIcon>
                  <Icon icon={FiLock} size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? FiEyeOff : FiEye} size={18} />
                </PasswordToggle>
              </InputWrapper>
              {formData.password && (
                <>
                  <PasswordStrength strength={passwordStrength} />
                  <PasswordHint>
                    Password should contain at least 8 characters, uppercase, lowercase, number and special character
                  </PasswordHint>
                </>
              )}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                <InputIcon>
                  <Icon icon={FiLock} size={18} />
                </InputIcon>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon icon={showConfirmPassword ? FiEyeOff : FiEye} size={18} />
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            <CheckboxWrapper>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </CheckboxWrapper>

            <CheckboxWrapper>
              <input
                type="checkbox"
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange}
              />
              <label htmlFor="subscribeNewsletter">
                Subscribe to our newsletter for updates and exclusive offers
              </label>
            </CheckboxWrapper>

            <SignupButton type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </SignupButton>
          </Form>

          <Divider>
            <span>or</span>
          </Divider>

          <LoginLink>
            Already have an account? <Link to="/login">Sign in here</Link>
          </LoginLink>
        </SignupCard>
      </Container>
    </SignupWrapper>
  );
};

export default Signup;
