/** @format */

import ERC721ABI from "../constants/ABIs/IERC721.json";
import ERC1155ABI from "../constants/ABIs/IERC1155.json";
import XchangeContractABI from "../constants/ABIs/degenExchangeRegistry.json";

const config = {
  info: {
    projectName: "degenXchange",
    version: "0.1.3a",
    inProd: false,
  },
  api: {
    endPoint: "https://index-syncer.herokuapp.com",
    indexerId: "l6UEqiki8T6WgjM3OUJY",
  },
  deployedContracts: {
    abis: {
      xchangeRegistry: XchangeContractABI.abi,
      erc721: ERC721ABI.abi,
      erc1155: ERC1155ABI.abi,
    },

    testing: {
      xchangeRegistry: "0x7c775404d013951c22EC1e59C021C9b1376Fd7c4",
      testTokenContract: "0x1759106296F0875694515c02b399F8e5bdf12637",
      VRNHost: "",
      network: { chainId: 5, name: "goerli" },
      ens: {
        xchangeRegistry: "0xa5B482B82e5D30eE91C36AA5aB49E8C5d9ed348d",
        ensContract: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
        indexerId: "7edhy6dZTeKZCe9TTtyi",
      },
    },
    production: {
      ethereum: {
        xchangeRegistry: "",
        testTokenContract: "",
        VRNHost: "",
        network: { chainId: 1, name: "eth" },
        ens: {
          xchangeRegistry: "",
          ensContract: "",
        },
      },
    },
  },
};

//  l6UEqiki8T6WgjM3OUJY - new
//  48cjuqKCaAiadaMWlMvo - old

export default config;
// "https://index-syncer.herokuapp.com"

//  V1.2 - 0x9757A190a594413eEb5548b53D15395c8647c74f
//  V1.3 - 0x09c41b725196A1D1E38B3d0b43D7D13014d3DCd6
//  V1.4 - 0x1991b12A6d759e1Df9d8E9155a876EFB65499a35
//  V1.5 - 0x3031a2bd6432332c64272d8fB9727375Be56139c
//  V1.6 - 0xee513ADD316E23f57EdbbdB283A30C3A51AD52da
//  V1.7 - 0x715fa641F8c82B91ad15C0dC92ea5c32CA5DDDFC
//  V1.8 - 0x816e728C0E2F3c81e42A4Babf8E94C9f24E9E2e3
//  V1.9 - 0x234f926017161f7a88D6A1a1dC7b00fd3aB30F0D
//  V1.10 - 0x39b58Baed56265506AeB456e301f890743e8EA64
//  V1.11 - 0x9d21c2925916C2e0150E4721075f201c94F77536
//  V1.12 - 0xb04719F124386E0a6285eA501321dDb26F7D16eb
//  V1.13 - 0x9AA324Ae105a41B4D309226Cd5379DCb233E6Bb0
//  C1.14 - 0x85Be3Dbe3E9601436A6bf0cC88FdF1ebf48DACb1

//  Goerli
//  V2.3  - 0xa6eF7147009E8F3E0613A6fEb231f94EE797379c
//  V2.4  -
//  V2.5  - 0x4AFED083A06640F58e6587560E5B4540bfDF0A47
