/** @format */

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.gif";
declare module "../assets/*.jpeg";
declare module "../assets/*.jpg";
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}
