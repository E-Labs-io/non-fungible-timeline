/** @format */

import { ThemeProvider } from "styled-components";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GlobalStyles } from "styles/globalStyles";
import { theme } from "styles/theme";
import UserWeb3Provider from "e-labs_web3provider";
import "../styles/timeline-loadmore.css";
import { NFTimelineProvider } from "hooks/NFTimelineProvider";

import "../styles/css/timeline.min.css";
import "react-tooltip/dist/react-tooltip.css";
import { availableChains } from "hooks/web3/constants/avalabuleChains";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserWeb3Provider allowedChains={availableChains}>
          <NFTimelineProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </NFTimelineProvider>
        </UserWeb3Provider>
      </ThemeProvider>
    </>
  );
}
