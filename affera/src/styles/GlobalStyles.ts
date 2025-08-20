import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: "Tenor Sans";
  src: url("/fonts/TenorSans-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-VariableFont_wdth,wght.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-stretch: 75% 100%;
  font-display: swap;
}
  :root {
    --header-height: 120px;
    --primary-color: #000000;
    --accent-color: #224834;
    --racing-green: #224834;
    --text-color: #000000;
    --text-light: #666666;
    --border-color: #e5e5e5;
    --background-color: #ffffff;
    --background-light: #f8f9fa;
    --background-dark: #000000;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --container-width: 1200px;
    --max-width: 1200px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --font-display: "Open Sans", sans-serif; /* primary body text */
    --font-primary: "Open Sans", sans-serif; /* primary body text */
    /* Responsive breakpoints */
    --breakpoint-sm: 480px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1200px;
    --breakpoint-xxl: 1440px;
    --breakpoint-ultra: 1920px;
    
    /* Responsive container widths */
    --container-sm: 100%;
    --container-md: 100%;
    --container-lg: 1024px;
    --container-xl: 1200px;
    --container-xxl: 1400px;
    --container-ultra: 1600px;
    
    /* Responsive padding */
    --padding-sm: 1rem;
    --padding-md: 1.5rem;
    --padding-lg: 2rem;
    --padding-xl: 2.5rem;
    --padding-xxl: 3rem;
  }

  /* Responsive container width adjustments */
  @media (min-width: 1440px) {
    :root {
      --max-width: var(--container-xxl);
    }
  }

  @media (min-width: 1920px) {
    :root {
      --max-width: var(--container-ultra);
    }
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
    font-weight: 500;
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
