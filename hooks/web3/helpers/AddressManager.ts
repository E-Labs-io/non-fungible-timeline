/** @format */

import EventEmitter from "events";
import Address from "./Address";
import { ethers } from "ethers";

export default class AddressBook extends EventEmitter {
  private addressBook: Address[];
  private usersAddress: Address;
  private readonly provider: ethers.providers.Provider;

  constructor(
    givenProvider: ethers.providers.Provider,
    usersAddress?: { addressOrEns: string; label?: string }
  ) {
    super();
    this.provider = givenProvider;
    if (usersAddress) {
      this.usersAddress = new Address(
        usersAddress.addressOrEns,
        this.provider,
        usersAddress.label
      );
    }
  }

  /**
   *
   *  Session Users is there is one
   */
  public getUsersAddress = () => this.usersAddress;
  public changeUsersAddress = (addressOrEns: string, lable: string) =>
    (this.usersAddress = new Address(addressOrEns, this.provider, lable));

  public addAddress(addressOrEns: string, walletLabel?: string) {
    const exists = this.addressExists(addressOrEns);
    if (!exists) {
      const newAddress = new Address(addressOrEns, this.provider, walletLabel);
      this.addressBook.push(newAddress);
      newAddress.on("ready", () => newAddress);
    } else return false;
  }

  /**
   *
   * Address handeling
   */
  private isEthereumAddress = (address: string): boolean =>
    ethers.utils.isAddress(address);
    
  public addressExists(addressOrEns: string) {
    if (this.isEthereumAddress(addressOrEns))
      return this.addressBook.some(
        (address) => address.getAddress() === addressOrEns
      );
    else
      return this.addressBook.some(
        (address) => address.getEns() === addressOrEns
      );
  }

  public searchForAddress(addressOrEns: string) {
    if (this.isEthereumAddress(addressOrEns))
      return this.addressBook.find(
        (address) => address.getAddress() === addressOrEns
      );
    else
      return this.addressBook.find(
        (address) => address.getEns() === addressOrEns
      );
  }

  public searchByWalletLabel(walletLabel: string) {
    return this.addressBook.find(
      (address) => address.getWalletLabel() === walletLabel
    );
  }
}
