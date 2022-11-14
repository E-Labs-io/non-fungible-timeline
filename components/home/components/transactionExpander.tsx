/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Button } from "../../common";
import { buildNetworkScanLink } from "../../../hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "../../../hooks/window/openLinkInNewTab";

import {
  BlockCounter,
  sortedDataFormat,
} from "../../../helpers/data/sortUsersHistory";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import NFTPaginate from "hooks/web3/components/NFTPaginate";

const Wrapper = styled.div`
  width: 50vw;
  height: 50vh;
  padding: 10px;
  color: black;
`;

const TitleArea = styled.div`
  width: 100%;
  font-size: medium;
  font-weight: bolder;
  text-align: left;
  direction: flex;
  flex-direction: row;
  row-gap: 100px;
  columns: 2;
`;

const Expander = styled.div`
  width: 100%;
  min-height: ${({ isOpen }) => (isOpen ? "100px" : "50px")};
  direction: flex;
  padding: 10px;

  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 15px;
  transition: all 0.3s ease-out;
`;

const DataArea = styled.div`
  width: 100%;
  padding: 5px;
`;

const OverViewParagraph = styled.div`
  width: 80%;
  text-align: left;
`;

const Link = styled.a``;

const TokenDisplay = styled.div``;

interface TransactionExpanderProps {
  selectedData: any;
  hash: string;
}
const TransactionExpander = ({
  selectedData,
  hash,
}: TransactionExpanderProps) => {
  console.log("in expander Data: ", selectedData);
  console.log("in expander hash: ", hash);

  const [isReady, setReady] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [blockData, setBlockData] = useState(selectedData);

  useEffect(() => {
    if (!isReady) {
      setBlockData(selectedData);
    }
    if(isReady && !isLoaded){
        
    }
  });

  const handleContainerOpen = () => (isOpen ? setOpen(false) : setOpen(true));

  return (
    <Wrapper>
      <Expander isOpen={isOpen}>
        <TitleArea>
          {shortenWalletAddress(hash, 20)}
          <FontAwesomeIcon
            size="2x"
            icon={isOpen ? faSquareMinus : faSquarePlus}
            onClick={handleContainerOpen}
          />
        </TitleArea>
        {isOpen && (
          <DataArea>
            <OverViewParagraph>You interacted with {}</OverViewParagraph>
            <br />
            <TokenDisplay>
                <NFTPaginate  />
            </TokenDisplay>
          </DataArea>
        )}
      </Expander>
    </Wrapper>
  );
};

export default TransactionExpander;
