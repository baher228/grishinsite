import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import Icon from '../../components/common/Icon';

const LoginWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: clamp(2rem, 5vw, 3rem);
  width: 100%;
  max-width: 450px;
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

const ForgotPassword = styled(Link)`
  color: #3CB371;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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
  margin-top: 1rem;

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

const SignupLink = styled.div`
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
  
  label {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', formData);
    }, 1000);
  };

  return (
    <LoginWrapper>
      <Container>
        <LoginCard>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your account to continue</Subtitle>
          
          <Form onSubmit={handleSubmit}>
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
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <InputIcon>
                  <Icon icon={FiLock} size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
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
            </InputGroup>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CheckboxWrapper>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </CheckboxWrapper>
              
              <ForgotPassword to="/forgot-password">
                Forgot password?
              </ForgotPassword>
            </div>

            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </LoginButton>
          </Form>

          <Divider>
            <span>or</span>
          </Divider>

          <SignupLink>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </SignupLink>
        </LoginCard>
      </Container>
    </LoginWrapper>
  );
};

export default Login;
