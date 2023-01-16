/** @format */

import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-1DNZFN7WMB"
          ></script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TAG}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_TAG}');
        `}
          </Script>

          <meta name="description" content="Enabling your web3 Community" />
          <meta name="keywords" content="m3mb3rs club member drop lab" />
          <meta name="author" content="Ray Chooi" />

          <html lang="en" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
