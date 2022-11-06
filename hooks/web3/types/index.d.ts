/** @format */

declare module "../assets/*.jpeg";
declare module "../assets/*.jpg";
declare module "*.json" {
  const value: any;
  export default value;
}

//  Component Interfaces
export { Web3ConnectButtonProps } from "./componentInterfaces";
export { userSignMessageInterface } from "./componentInterfaces";
export { UserWeb3ProviderInterface } from "./componentInterfaces";
export { TokenGatewayInterface } from "./componentInterfaces";
export { UserWeb3ProviderContextType } from "./componentInterfaces";

//  Access & API Token types
export { moralisKeysType } from "./acceessTokenTypes";
export { CustomWeb3ModalProvidersType } from "./acceessTokenTypes";

//  Component Types
export { TokenGatwayDataType } from "./componentTypes";
export { networkType } from "./componentTypes";

//  Contract Interfacing Interfaces
export { connectToContractInterface } from "./interfacingInterfaces";
export { connectToTokenContractInterface } from "./interfacingInterfaces";

//  Helper Interfaces
export { buildNetworkScanLinkInterface } from "./helperInterfaces";
export { ContractABIInterface } from "./helperInterfaces";

//  Helper Types
export { networkDataType } from "./helperTypes";


