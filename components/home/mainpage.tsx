/** @format */
import { Button, Modal } from "../common";
import { ConnectButton, useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingNotice from "./components/loadingNotice";
import TimelineBox from "./components/timelineBox";

import inboundTransactionData from "../../constants/Inbound-TestData.json";
import outboundTransactionData from "../../constants/outBound-Testdata.json";
import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import sortUsersHistory from "../../helpers/data/sortUsersHistory";
import SmallTimelineBox from "./components/smallTimelineBox";
import BlockModal from "./components/BlockModal";

const PageContainer = styled.div`
  background: ${({ theme }) =>
    theme ? theme.coloredTheme.background : "white"};
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
`;

const ConnectionArea = styled.div`
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 20vh;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const BlockListColum = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * @dev : Non-Fungible Timeline Home
 *
 */
interface MainPageProps {}
function MainPage({}: MainPageProps) {
  const [connected, setConnected] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [ready, setReady] = useState<boolean>(false);

  const [usersAddress, setUsersAddress] = useState<string>();
  const { walletAddress, userProvider } = useWeb3Provider();

  const [rawInHistory, setRawInHistory] = useState<any>();
  const [sortedInHistory, setSortedInHistory] = useState<any>();
  const [rawOutHistory, setRawOutHistory] = useState<any>();
  const [sortedOutHistory, setSortedOutHistory] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<any>();

  const getUsersHistory = async (
    from: string,
    to?: string
  ): Promise<AssetTransfersWithMetadataResult[]> => {
    if (from === "in") {
      setRawInHistory(inboundTransactionData);
      return inboundTransactionData;
    } else {
      setRawOutHistory(outboundTransactionData);
      return outboundTransactionData;
    }
  };

  useEffect(() => {
    if (!connected && userProvider) {
      setConnected(true);
      setUsersAddress(walletAddress);
    }
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const searchUsersHistory = async () => {
    setLoadingState(1);
    const inBound = await getUsersHistory("in");
    setLoadingState(2);
    const outBound = await getUsersHistory("out");
    setLoadingState(3);
    const sortedData = sortUsersHistory(inboundTransactionData);
    setSortedInHistory(sortedData);
    setLoadingState(5);
  };

  return (
    <PageContainer>
      <ConnectionArea>
        <ConnectButton backgroundColor="#d5d1d16cf" />
        {connected && !ready && loadingState === 0 && (
          <Button onClick={searchUsersHistory}>Search</Button>
        )}
        <LoadingNotice loadingState={loadingState} />
      </ConnectionArea>
      <BlockListColum>
        {!!sortedInHistory &&
          sortedInHistory.allBlocks.map((item, key) => (
            <SmallTimelineBox
              transactionDataBase={sortedInHistory.sorted[item[0]]}
              blockCountData={item}
            />
          ))}
      </BlockListColum>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <BlockModal />
      </Modal>
    </PageContainer>
  );
}

export default MainPage;
