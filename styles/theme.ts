/** @format */

import { reactDatepicker } from "styles/DatepickerStyles";

export const theme: themeInterface = {
  offWhite: "#f8f8ff",
  offBlack: "#0e1111",
  cream: "#FCF4D7",
  light: "#EFFFFA",
  primaryDark: "#0D0C1D",
  primaryLight: "#FFFFFF",
  primaryHover: "#343078",
  mobile: "576px",
  blue: "#c23616",
  silver: "#7f8c8d",
  coloredTheme: {
    background: "linear-gradient(204deg,#00dbde 0%,#fc00ff 77%,#ffffff 100%)",
    backgroundSecondary: "#7f8c8d",
    color: "#0D0C1D",
    borderColor: "#EFFFFA",
  },
  lightTheme: {
    background: "#FCF4D7",
    color: "#0D0C1D",
    borderColor: "#0e1111",
  },
  darkTheme: {
    background: "#0D0C1D",
    color: "#FCF4D7",
    borderColor: "#0e1111",
  },
  fontSizes: {
    small: "16px",
    medium: "20px",
    large: "24px",
  },
  breakpoints: ["32em", "48em", "64em"],
  reactDatepicker: reactDatepicker,
};

export type themeInterface = {
  offWhite: string;
  offBlack: string;
  cream: string;
  light: string;
  primaryDark: string;
  primaryLight: string;
  primaryHover: string;
  mobile?: string;
  blue: string;
  silver: string;
  coloredTheme: {
    background: string;
    backgroundSecondary: string;
    color: string;
    borderColor: string;
  };
  lightTheme: {
    background: string;

    color: string;
    borderColor: string;
  };
  darkTheme: {
    background: string;
    color: string;
    borderColor: string;
  };
  fontSizes: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: string[];
  reactDatepicker: { [key: string]: any };
};

export type ThemeProps = { theme: typeof theme };
