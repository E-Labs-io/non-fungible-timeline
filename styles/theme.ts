/** @format */

import { reactDatepicker } from "styles/DatepickerStyles";
import { themeInterface } from "e-labs_generic-components";

export const theme: themeInterface = {
  singleTheme: {
    background: "#324690",
    backgroundSecondary: "#7f8c8d",
    color: "#ffffff",
    border: { size: "2px", color: "black", style: "solid" },
    gradientBackground:
      "linear-gradient(204deg,#00dbde 0%,#fc00ff 77%,#cfcfcfad 100%)",
    accentColor: "86848436",
    primaryHover: "cyan",
    shadow: {
      outerShadow: "",
      innerShadow: "inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682)",
    },
  },
  mobile: "576px",
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
