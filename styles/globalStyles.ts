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
    background: ${({ theme }) => theme.darkTheme.background};
    color: ${({ theme }) => theme.primaryLight};
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
`;
