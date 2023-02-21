/** @format */

import React, { useEffect, useState, createContext } from "react";
import {
  connectToAlchemyProvider,
  getAddresses,
  signMessage,
  web3Connection,
} from "./utils/connectWeb3";

import { ethers } from "ethers";
import connectWeb3Modal from "./components/web3Modal";
import ListenToProvider from "./helpers/ListenToProvider";
import alchemyAPI from "./api/alchemySetup";
import config from "config/config";
import { shortenWalletAddress } from "./helpers/textHelpers";
import { Network } from "alchemy-sdk";
import ensResolver from "./helpers/ensResolver";

export interface UserWeb3ProviderContextType {
  walletAddress: string;
  shortWalletAddress: string;
  userProvider: ethers.providers.Provider;
  userSigner: ethers.Signer;
  auxStorage: { [key: string]: any };
  updateAuxStorage: Function;
  connectToUsersProvider: Function;
  userSignMessage: Function;
  web3API: any;
  disconnectProvider: Function;
  connectToGivenProvider: Function;
  useEnsResolver: Function;
  localProvider: ethers.providers.Provider;
}

export type GivenProviderAllowance = "alchemy";

export const UserWeb3Context = createContext({
  localProvider: null,
  walletAddress: "",
  shortWalletAddress: "",
  userProvider: null,
  auxStorage: {},
  userSigner: null,
  useEnsResolver: (network: string) => Promise,
  updateAuxStorage: (param: string, value: any) => {},
  connectToUsersProvider: (userAction: boolean) => {},
  web3API: null,
  userSignMessage: (signer: ethers.Signer, message: string) => {},
  disconnectProvider: () => {},
  connectToGivenProvider: (
    provider: GivenProviderAllowance,
    network: string
  ) => {},
} as UserWeb3ProviderContextType);

export const APIKeys = {
  alchemy: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,

    network: Network.ETH_MAINNET,
    maxRetries: 10,
  },
};

const AlchemyAPI = alchemyAPI(APIKeys.alchemy);
export const web3API = AlchemyAPI;

const UserWeb3Provider = ({ children }) => {
  const [localProvider, setLocalProvider] =
    useState<ethers.providers.Provider>();
  const [userProvider, setUserProvider] = useState(null);
  const [userSigner, setUserSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [shortWalletAddress, setShortWalletAddress] = useState("");
  const [auxStorage, setAuxStorage] = useState({});
  const [providerInterface, setProviderInterface] = useState(null);

  //  External Functions
  /**
   * @notice                        - Update an input in the auxStorage
   * @param {string} param          - The entry in the auxStorage to update or create
   * @param {string} value          - The value to save into the entry
   */
  const updateAuxStorage = (param: string, value: any) => {
    const preStorage = auxStorage;
    setAuxStorage({ ...preStorage, [param]: value });
  };

  const connectToGivenProvider = async (
    provider: GivenProviderAllowance,
    network
  ): Promise<ethers.providers.Provider> => {
    let connection;
    if (provider === "alchemy") {
      connection = connectToAlchemyProvider(network);
    }

    return connection;
  };

  const useEnsResolver = async (network: string) =>
    connectToGivenProvider("alchemy", network).then((provider) =>
      ensResolver(provider).then((resolver) => resolver)
    );

  /**
   * @notice                        - Handles any changed on the provider from listeners
   * @param {string} action         - What action has happened
   */
  const onProviderChangeCallback = (action?: string) => {
    if (action === "disconnect") {
      setAuxStorage({});
      setUserProvider(null);
      setUserSigner(null);
      setWalletAddress(null);
    } else if (action === "accountsChanged") {
      if (!userProvider) {
        connectToUsersProvider(true);
      } else {
        const newWallet = getAddresses(userProvider)[0];
        setWalletAddress(newWallet);
      }
    } else {
      connectToUsersProvider(true);
    }
  };

  /**
   * @notice                        - Users sign's message to prove ownership
   * @param {object} signer         - Singer to use for the message
   * @param {string} message        - message to be signed
   * @param {string} checkAddress   - Optional: to match the address to
   * @returns {boolean}             - If the signature passed
   */
  const userSignMessage = async (
    signer: ethers.Signer,
    message: string,
    checkAddress?: string
  ) => {
    const singedMessage = await signMessage(signer, message);
    const singingAddress = ethers.utils.verifyMessage(message, singedMessage);
    const singerAddress = checkAddress
      ? checkAddress
      : await signer.getAddress();
    if (singingAddress === singerAddress) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * @notice                        - Connect to the given users provider
   * @param {boolean} userAction    - if the user asked for the connection or not
   * @returns {boolean}
   */
  const connectToUsersProvider = async (userAction: boolean) => {
    if (userProvider && !userAction) {
      //  If we are already connected ... then great!
      console.log("🟢 connectToUsersProvider: Already got provider");
      return true;
    }
    if (userAction) {
      //  If the user actioned the connection, do it
      const walletDetails:
        | {
            address?: string[];
            provider?: object;
            providerInterface?: any;
            network?: any;
            signer?: object;
            balance?: number;
            web3ModalInstance?: any;
          }
        | false = await web3Connection(1);

      if (walletDetails) {
        //    If the connection was successful save up
        setUserProviderData(walletDetails);
        ListenToProvider(
          walletDetails.providerInterface,
          onProviderChangeCallback
        );
        return true;
      }
    }
    return false;
  };

  const disconnectProvider = () => {
    setUserProvider(null);
    setUserSigner(null);
    setWalletAddress("");
    setShortWalletAddress("");
    setAuxStorage({});
  };

  //  Internal Function
  const setUserProviderData = (walletDetails) => {
    const walletDetailsAddress = walletDetails?.address?.[0] || "";
    setUserProvider(walletDetails.provider);
    setWalletAddress(walletDetailsAddress);
    setUserSigner(walletDetails.signer);
    setProviderInterface(walletDetails.providerInterface);
    updateAuxStorage("balance", walletDetails.balance);
    setShortWalletAddress(shortenWalletAddress(walletDetailsAddress));

    setAuxStorage({
      ...auxStorage,
      balance: walletDetails.balance,
      network: walletDetails.network,
      web3ModalInstance: walletDetails.web3ModalInstance,
    });

    setShortWalletAddress(shortenWalletAddress(walletDetailsAddress));
  };

  useEffect(() => {
    if (({ auxStorage }) => auxStorage?.web3ModalInstance.cachedProvider)
      ({ auxStorage }) => connectWeb3Modal(auxStorage.web3ModalInstance);
    if (!localProvider) {
      connectToGivenProvider("alchemy", "mainnet").then((provider) =>
        setLocalProvider(provider)
      );
    }
  });

  return (
    <UserWeb3Context.Provider
      value={{
        walletAddress,
        shortWalletAddress,
        userProvider,
        userSigner,
        auxStorage,
        updateAuxStorage,
        connectToUsersProvider,
        userSignMessage,
        web3API,
        localProvider,
        disconnectProvider,
        connectToGivenProvider,
        useEnsResolver,
      }}
    >
      {children}
    </UserWeb3Context.Provider>
  );
};

export default UserWeb3Provider;
