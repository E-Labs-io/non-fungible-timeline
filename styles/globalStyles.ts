/** @format */

import { createGlobalStyle } from "styled-components";
import { themeInterface, ThemeProps } from "./theme";

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
    background: ${({ theme }) => theme.coloredTheme.gradient};
    color: ${({ theme }) => theme.coloredTheme.color};
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: ${({ theme }) => theme.fontFamily.mainFont}
  }

  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
`;
