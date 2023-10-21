/** @format */

import { ActiveChainIndex, ChainsIcons } from "../types/Chains";

const availableChains: ActiveChainIndex = {
  ETH_MAINNET: true,
  OPT_MAINNET: true,
  ARB_MAINNET: true,
  MATIC_MAINNET: true,
  ETH_GOERLI: false,
  OPT_GOERLI: false,
  ARB_GOERLI: false,
  MATIC_MUMBAI: false,
};

const ChainIcons: ChainsIcons = {
  ETH_MAINNET: { icon: "/icons/ethereum-logo.svg", toolTip: "Ethereum" },
  OPT_MAINNET: { icon: "/icons/optimism-logo.svg", toolTip: "Optimism" },
  ARB_MAINNET: { icon: "/icons/arbitrum-logo.svg", toolTip: "Arbitrum" },
  MATIC_MAINNET: { icon: "/icons/polygon-logo.svg", toolTip: "Polygon" },
};

export { availableChains, ChainIcons };
