/** @format */

import EventEmitter from "events";
import Address from "./Address";
import { ethers } from "ethers";

export default class AddressBook extends EventEmitter {
  private addressBook: Address[] = [];
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
   *  Session Users if there is one
   */
  public getUsersAddress = () => this.usersAddress;
  public changeUsersAddress = (addressOrEns: string, label: string) =>
    (this.usersAddress = new Address(addressOrEns, this.provider, label));

  public addAddress(addressOrEns: string | Address, walletLabel?: string) {
    if (addressOrEns instanceof Address) {
      if (!this.addressExists(addressOrEns)) {
        this.addressBook.push(addressOrEns);
      }
    } else if (!this.addressExists(addressOrEns)) {
      const newAddress = new Address(addressOrEns, this.provider, walletLabel);
      this.addressBook.push(newAddress);
      newAddress.on("ready", () => newAddress);
    } else return false;
  }

  /**
   *
   * Address handling
   */
  private isEthereumAddress = (address: string): boolean =>
    ethers.utils.isAddress(address);

  public addressExists(addressOrEns: string | Address): boolean {
    let address;
    if (addressOrEns instanceof Address) {
      address = addressOrEns.getAddress();
    } else {
      address = addressOrEns;
    }

    if (this.isEthereumAddress(address) && this.addressBook.length > 0) {
      return this.addressBook.some(
        (addressObject) => addressObject.getAddress() === address
      );
    } else {
      return this.addressBook.some(
        (addressObject) => addressObject.getEns() === address
      );
    }
  }

  public searchForAddress(addressOrEns: string | Address): Address | undefined {
    let address;
    if (addressOrEns instanceof Address) {
      address = addressOrEns.getAddress();
    } else {
      address = addressOrEns;
    }

    if (this.isEthereumAddress(address)) {
      return this.addressBook.find(
        (addressObject) => addressObject.getAddress() === address
      );
    } else {
      return this.addressBook.find(
        (addressObject) => addressObject.getEns() === address
      );
    }
  }

  public searchByWalletLabel(walletLabel: string) {
    return this.addressBook.find(
      (address) => address.getWalletLabel() === walletLabel
    );
  }

  public removeFromAddressBook = (address: string) => {
    this.addressBook = this.addressBook.filter(
      (addressObject) => addressObject.getAddress() !== address
    );
  };

  public addressCount = () => this.addressBook.length;
  public getAddressBook = () => this.addressBook;
}
