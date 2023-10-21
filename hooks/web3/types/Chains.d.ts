/** @format */

import { type } from "os";

type NetworkKeys =
  | "ETH_MAINNET"
  | "ETH_GOERLI"
  | "OPT_MAINNET"
  | "OPT_GOERLI"
  | "ARB_MAINNET"
  | "ARB_GOERLI"
  | "MATIC_MAINNET"
  | "MATIC_MUMBAI";

type ChainsIcons = {
  [chain in NetworkKeys]?: { icon: string; toolTip: string };
};

type ActiveChainIndex = {
  [chain in NetworkKeys]?: boolean;
};

export type { NetworkKeys, ChainsIcons, ActiveChainIndex };
