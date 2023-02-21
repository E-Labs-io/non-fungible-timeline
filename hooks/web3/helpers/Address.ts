/** @format */

import { ethers } from "ethers";
import { EventEmitter } from "events";

export default class Address extends EventEmitter {
  private walletLabel: string;
  private hasENS: boolean;
  private address: string;
  private ens: string;
  public readonly zeroAddress: string =
    "0x0000000000000000000000000000000000000000";
  private provider: ethers.providers.Provider;

  private ready: boolean = false;

  public readonly etherscanPrefix = {
    eth: "https://etherscan.io",
    rinkeby: "https://rinkeby.etherscan.io",
    kovan: "https://kovan.etherscan.io",
    goerli: "https://goerli.etherscan.io",
    polygon: "https://polygonscan.com/",
  };

  constructor(
    addressOrEns: string,
    givenProvider?: ethers.providers.Provider,
    walletLabel?: string
  ) {
    super();
    this.provider = givenProvider;
    this.walletLabel = walletLabel ?? "";

    if (!!givenProvider) {
      if (this.isEthereumAddress(addressOrEns)) {
        this.address = addressOrEns;
        this.ensFromAddress(addressOrEns).then((ens) => {
          if (ens) {
            this.ens = ens;
            this.hasENS = true;
          } else {
            this.hasENS = false;
          }
          this.ready = true;
          this.emit("ready");
        });
      } else if (this.isENS(addressOrEns)) {
        this.addressFromEns(addressOrEns).then((address: string) => {
          if (address) {
            this.address = address;
            this.hasENS = true;
            this.ens = addressOrEns;
            this.ready = true;
            this.emit("ready");
          } else {
            throw new Error("Address or ENS is not valid");
          }
        });
      } else throw new Error("Address or ENS is not valid");
    } else {
      this.address = addressOrEns;
      this.ready = true;
      this.emit("ready");
    }
  }

  private isEthereumAddress = (address: string): boolean =>
    ethers.utils.isAddress(address);

  private ensFromAddress = async (address: string): Promise<string> =>
    await this.provider.lookupAddress(address);

  private addressFromEns = async (ensAddress: string): Promise<string> =>
    await this.provider.resolveName(ensAddress);

  private isENS = (input: string): boolean =>
    input.slice(-4) === ".eth" || input.slice(-4) === ".ETH" ? true : false;

  public shortenAddress = (firstAmount?: number): string =>
    this.address
      ? `${this.address.substring(
          0,
          firstAmount ? firstAmount : 5
        )}..${this.address.substring(this.address.length - 4)}`
      : "";

  public getAddress = (): string => this.address;
  public getEns = (): string => this.ens;
  public hasEns = (): boolean => this.hasENS;
  public getWalletLabel = (): string => this.walletLabel;
  public setWalletLabel = (label: string): string => (this.walletLabel = label);

  public getWalletEtherscanUrl = (network: string) =>
    `${this.etherscanPrefix[network]}/address/${this.address}`;
  public getWalletOpenSeaUrl = () => `https://opensea.io/${this.address}`;

  public isReady = () => this.ready;
}
