/** @format */

import {
  description,
  siteCardImage,
  siteName,
  siteTitle,
  siteUrl,
  twitterHandle,
} from "constants/websiteMeta";
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:ital@1&family=Sofia+Sans:wght@300&display=swap"
            rel="stylesheet"
          />

          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TAG}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_TAG}');
        `}
          </Script>

          <meta name="description" content={description} />
          <meta
            name="keywords"
            content="NFT timeline non-fungible NFTimeline crypto opensea blur bayc"
          />
          <meta name="author" content="e-labs" />
          <html lang="en" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content={twitterHandle} key="twhandle" />
          {/* Open Graph */}
          <meta property="og:url" content={siteUrl} key="ogurl" />
          <meta property="og:image" content={siteCardImage} key="ogimage" />
          <meta property="og:site_name" content={siteName} key="ogsitename" />
          <meta property="og:title" content={siteTitle} key="ogtitle" />
          <meta property="og:description" content={description} key="ogdesc" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
