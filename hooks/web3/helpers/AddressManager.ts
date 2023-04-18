/** @format */

import EventEmitter from "events";
import Address from "./Address";
import { ethers } from "ethers";

export default class AddressBook extends EventEmitter {
  private addressBook: Address[];
  private readonly provider: ethers.providers.Provider;

  constructor(
    givenProvider: ethers.providers.Provider,
    usersAddress?: { addressOrEns: string; label?: string }
  ) {
    super();
    this.provider = givenProvider;
    if (usersAddress) {
      this.addAddress(usersAddress.addressOrEns, usersAddress.label);
    }
  }

  public addAddress(addressOrEns: string, walletLabel?: string) {
    const exists = this.searchForAddress(addressOrEns);
    if (!exists) {
      const newAddress = new Address(addressOrEns, this.provider, walletLabel);
      this.addressBook.push(newAddress);
      newAddress.on("ready", () => true);
    } else return false;
  }

  private isEthereumAddress = (address: string): boolean =>
    ethers.utils.isAddress(address);

  public searchForAddress(addressOrEns: string) {
    if (this.isEthereumAddress(addressOrEns))
      return this.addressBook.find(
        (address) => address.getAddress() === addressOrEns
      );
    else this.addressBook.find((address) => address.getEns() === addressOrEns);
  }

  public searchByWalletLabel(walletLabel: string) {
    return this.addressBook.find(
      (address) => address.getWalletLabel() === walletLabel
    );
  }
}
