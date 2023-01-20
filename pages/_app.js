/** @format */

import { ThemeProvider } from "styled-components";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GlobalStyles } from "styles/globalStyles";
import { theme } from "styles/theme";
import UserWeb3Provider from "hooks/web3/userWeb3Provider";
import "../styles/timeline-loadmore.css";
import { NFTimelineProvider } from "hooks/NFTimelineProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserWeb3Provider>
          <NFTimelineProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </NFTimelineProvider>
        </UserWeb3Provider>
      </ThemeProvider>
    </>
  );
}
