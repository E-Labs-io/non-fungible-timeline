/** @format */
import Web3Modal from "web3modal";

const web3Modal = (
  providerOptions,
  network?: string,
  cacheProvider?: boolean
) =>
  new Web3Modal({
    providerOptions: providerOptions,
    network: network ? network : null,
    cacheProvider: cacheProvider,
  });

const connectWeb3Modal = async (web3Modal: Web3Modal) =>
  await web3Modal.connect();

export default connectWeb3Modal;
export { web3Modal };
