/** @format */

import { reactDatepicker } from "styles/DatepickerStyles";

// "linear-gradient(204deg,#00dbde 0%,#fc00ff 77%,#ffffff 100%)",
// "linear-gradient(204deg,#8c61ff 0%,#44c2fd 77%,#5f59f7 100%)"

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
    background: "#324690",
    backgroundSecondary: "#7f8c8d",
    color: "#ffffff",
    colorLight: "#ffffff",
    colorDark: "#000000",
    borderColor: "#EFFFFA",
    gradient: "linear-gradient(204deg,#00dbde 0%,#fc00ff 77%,#ffffff 100%)",
    accentColor: "",
    shadowColor: "rgba(207, 207, 207, 0.682)",
    primaryHover: "",
    transparentBG: "#86848436",
  },
  shadow: {
    outerShadow: "",
    innerShadow: "inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682)",
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
  fontFamily: {
    mainFont: `"Kanit", sans-serif`,
    titleFont: `"Kanit", sans-serif`,
  },
  breakpoints: ["32em", "48em", "64em"],
  reactDatepicker: reactDatepicker,
};

// linear-gradient(204deg,#00dbde 0%,#fc00ff 77%,#ffffff 100%)
// linear-gradient(204deg,#00dbde 0%,#658864 77%,#B7B78A 100%)

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
    colorLight?: string;
    colorDark?: string;
    borderColor: string;
    accentColor?: string;
    shadowColor?: string;
    gradient?: string;
    primaryHover?: string;
    transparentBG: string;
  };
  shadow?: {
    outerShadow?: string;
    innerShadow?: string;
  };
  fontFamily?: {
    mainFont?: string;
    titleFont?: string;
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
