/** @format */

import { ThemeProps } from "e-labs_generic-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<ThemeProps>`
  html, body {
    margin: 0;
    padding: 0;
    max-width: 100vw;
    overflow-x: hidden;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.singleTheme.gradientBackground};
    color: ${({ theme }) => theme.singleTheme.color};
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: ${({ theme }) => theme.fontFamily.mainFont}
  }

  a {
    color: ${({ theme }) => theme.singleTheme.primaryHover};
    text-decoration: none;
  }
`;
