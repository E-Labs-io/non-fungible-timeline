/** @format */

import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const rcps = {
  1: "https://mainnet.infura.io/v3/",
  4: "https://goerli.infura.io/v3/",
};

const infuraKey = process.env.ALCHEMY_KEY;

const walletConnectProviderOption = (chainId: number) => {
  return {
    package: WalletConnect, // required
    options: {
      infuraId: infuraKey, // required
      rpc: rcps,
      chainId: chainId ? chainId : 4,
    },
  };
};

const coinbaseWalletProviderOptions = (
  chainId?: number,
  darkMode?: boolean
) => {
  return {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "degenXChange", // Required
      infuraId: infuraKey, // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      darkMode: darkMode ? darkMode : false, // Optional. Use dark theme, defaults to false
      chainId: chainId ? chainId : 4,
    },
  };
};

const allAvailableWalletProviders = (chainId?: number, darkMode?: boolean) => {
  return {
    coinbasewallet: coinbaseWalletProviderOptions(chainId, darkMode),
    walletconnect: walletConnectProviderOption(chainId),
  };
};
export default allAvailableWalletProviders;
export { coinbaseWalletProviderOptions, walletConnectProviderOption };
