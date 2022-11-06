/** @format */

export interface buildNetworkScanLinkInterface {
  network: string | number ;
  address?: string;
  tokenId?: number;
  block?: number;
  txHash?: string;
}

export interface ContractABIInterface {
  ERC20: object;
  ERC721: object;
  ERC1155: object;
}