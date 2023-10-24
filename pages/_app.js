/** @format */
import React from "react";
import { ThemeProvider } from "styled-components";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GlobalStyles } from "styles/globalStyles";
import { theme } from "styles/theme";
import UserWeb3Provider from "e-labs_web3provider";
import "../styles/timeline-loadmore.css";
import { NFTimelineProvider } from "hooks/NFTimelineProvider";

import "../styles/css/timeline.min.css";
import "react-tooltip/dist/react-tooltip.css";
import { availableChains } from "constants/chains";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserWeb3Provider
          allowedChains={availableChains}
          apiKeys={{ alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY }}
          primaryNetwork="ETH_MAINNET"
        >
          <NFTimelineProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </NFTimelineProvider>
        </UserWeb3Provider>
      </ThemeProvider>
    </>
  );
}
