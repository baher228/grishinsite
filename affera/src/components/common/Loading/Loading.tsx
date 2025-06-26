import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

const Spinner = styled.div`
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: var(--text-color);
  font-size: 1.1rem;
`;

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <LoadingWrapper>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
