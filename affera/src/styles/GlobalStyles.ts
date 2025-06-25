import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --header-height: 80px;
    --primary-color: #1a1a1a;
    --accent-color: #dc3545;
    --text-color: #333333;
    --text-light: #666666;
    --border-color: #e5e5e5;
    --background-color: #ffffff;
    --background-light: #f8f9fa;
    --background-dark: #1a1a1a;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --container-width: 1200px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    background-color: var(--background-light);
    color: var(--text-color);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea {
    font: inherit;
    outline: none;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 0.5rem 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: var(--primary-color);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  /* Transitions */
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-in;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-light);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--text-light);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-color);
  }
`;

export default GlobalStyles;
