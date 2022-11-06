/** @format */

import React, { ReactElement, useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import IERC721ABI from "../bin/ABIs/IERC721.json";
import IERC1155ABI from "../bin/ABIs/IERC1155.json";

import { UserWeb3Context } from "../userWeb3Provider";
import {
  getERCBalance,
  getOwnerOf,
  newContract,
} from "../utils/interfaces/ERC721Interaction.js";
import GateWay from "../components/Gateway";

interface TokenGatewayInterface {
  children?: ReactElement[] | ReactElement | string;
  gatewayData: TokenGatwayDataType;
}

export type TokenGatwayDataType = {
  tokenContract: string;
  contractInterface: string;
  tokenId?: number[];
  signRequired?: boolean;
};

const TokenGateway = ({ children, gatewayData }: TokenGatewayInterface) => {
  const {
    walletAddress,
    userSigner,
    updateAuxStorage,
    userSignMessage,
    auxStorage,
  } = useContext(UserWeb3Context);
  const [userAuthorised, setUserAuthorised] = useState(true);
  const [userSignedMessage, setUserSginedMessage] = useState(false);

  //  Check to see of the user has been authorised already
  if (auxStorage && auxStorage?.gatewayAuthorised) {
    setUserAuthorised(true);
  }

  //    If the user is connected to Web3 check they have access

  //  Check the sign has been compete if required
  const gateKeeper = async () => {
    if (userSigner && !userAuthorised) {
      if (gatewayData.signRequired) {
        const signed = await userSignMessage(
          userSigner,
          "web3 Gateway Check",
          walletAddress
        );
        setUserSginedMessage(signed);
      }

      if (gatewayData.signRequired && userSignedMessage) {
        if (gatewayData.contractInterface === "erc721") {
          //  If the gated token is ERC721
          //  Connect to contract
          const contractInstance = await newContract(
            gatewayData.tokenContract,
            IERC721ABI.abi,
            userSigner
          );
          //  If there are specific tokenId
          if (gatewayData.tokenId && gatewayData.tokenId?.length > 0) {
            //  Check each ID agents the wallet until we find a true and runout.
            for (
              let i = 0;
              i < gatewayData.tokenId.length && !userAuthorised;
              i++
            ) {
              (await getOwnerOf(contractInstance, gatewayData.tokenId[i])) ===
              walletAddress
                ? setUserAuthorised(true)
                : null;
            }
          } else {
            //  Just check that wallet has a balance of the token.
            (await getERCBalance(contractInstance, walletAddress)) > 0
              ? setUserAuthorised(true)
              : null;
          }
        }
        //    If the gated token is ERC1155
        if (gatewayData.contractInterface === "erc1155") {
          const contractInstance = await newContract(
            gatewayData.tokenContract,
            IERC1155ABI.abi,
            userSigner
          );

          if (gatewayData.tokenId && gatewayData.tokenId?.length > 0) {
            for (
              let i = 0;
              i < gatewayData.tokenId.length && !userAuthorised;
              i++
            ) {
              (await getOwnerOf(contractInstance, gatewayData.tokenId[i])) ===
              walletAddress
                ? setUserAuthorised(true)
                : null;
            }
          } else {
            (await contractInstance.balanceOf(
              walletAddress,
              gatewayData.tokenId
            )) > 0
              ? setUserAuthorised(true)
              : null;
          }
        }
      }
      updateAuxStorage("gatewayAuthorised", userAuthorised);
    }
  };

  return (
    <div>
      {userAuthorised && children}
      {!userAuthorised && (
        <GateWay checkFunction={gateKeeper} provider={userSigner} />
      )}
    </div>
  );
};

export default TokenGateway;
