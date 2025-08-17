import styled from "styled-components";

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-lg);
  width: 100%;

  @media (min-width: 1440px) {
    padding: 0 var(--padding-xl);
  }

  @media (min-width: 1920px) {
    padding: 0 var(--padding-xxl);
  }
  @media (max-width: 768px) {
    padding: 0 0.4rem;
  }
`;

export default Container;
