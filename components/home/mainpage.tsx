/** @format */
import { Button, Modal } from "../common";
import { ConnectButton, useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingNotice from "./components/loadingNotice";
import TimelineBox from "./components/timelineBox";

import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import sortUsersHistory, {
  blockCount,
  BlockCounter,
} from "../../helpers/data/sortUsersHistory";
import SmallTimelineBox from "./components/smallTimelineBox";
import BlockModal from "./components/BlockModal";
import { ethers } from "ethers";
import { connectToERC721Contract } from "hooks/web3/utils/interfaces/ERC721Interface";
import alchemyGetAssetTransfers from "hooks/web3/api/alchemyGetAssetTransfers";
import zeroAddress from "hooks/web3/data/zeroAddress";
import TimeLine from "./components/timeline/TimeLine";
import compileHistoryIntoDays, {
  compileHistoryIntoDaysReturn,
} from "helpers/data/compileHistoryIntoDays";

const PageContainer = styled.div`
  background: ${({ theme }) =>
    theme ? theme.coloredTheme.background : "white"};
  width: 100vw;
  height: 100%;

  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;
const HeadArea = styled.div`
  width: 100%;
  height: 150px;
  border-bottom: 2px solid white;
  box-shadow: 17px 33px 53px 4px rgba(0, 0, 0, 0.094);
`;

const BodyArea = styled.div`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

const PreLoadLayout = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
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
  direction: flex;
  flex-direction: column;
  columns: 2;
  padding: 10px;
  margin: auto;
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
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [rawOutHistory, setRawOutHistory] = useState<any>();
  const [sortedOutHistory, setSortedOutHistory] = useState<any>();

  const [contractInstances, setContractInstances] = useState<{
    [contractAddress: string]: { instance: ethers.Contract; name: string };
  }>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<any>();
  const [selectedBlockData, setSelectedBlockData] = useState<any>();

  interface GetUSersHistoryProps {
    from?: string;
    to?: string;
  }

  const getUsersHistory = async ({
    from,
    to,
  }: GetUSersHistoryProps): Promise<AssetTransfersWithMetadataResult[]> => {
    if (to) {
      //  Inbound
      const inBound = await alchemyGetAssetTransfers(from, to);
      setRawInHistory(inBound.result.transfers);
      return inBound.result.transfers;
    } else {
      // Out bounce
      const outBound = await alchemyGetAssetTransfers(from);
      setRawOutHistory(outBound.result.transfers);
      return outBound.result.transfers;
    }
  };

  useEffect(() => {
    if (!connected && userProvider) {
      setConnected(true);
      setUsersAddress("0x4ce0F96C459Df322dF68f393569549d5a54a1929");
    }
    if (usersAddress !== walletAddress) {
      //setReady(false);
      //setLoadingState(0);
    }
  });

  const handleOpenModal = (transactionData, contractConnection) => {
    setSelectedBlockData(transactionData);
    setSelectedBlock(contractConnection);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const searchUsersHistory = async () => {
    setLoadingState(1);
    const inBound = await getUsersHistory({
      from: zeroAddress(),
      to: usersAddress,
    });
    setLoadingState(2);
    const outBound = await getUsersHistory({ from: usersAddress });
    setLoadingState(3);
    const sortedDataIn = sortUsersHistory(inBound);
    const inByDate = compileHistoryIntoDays(sortedDataIn);
    setSortedInHistory(inByDate);
    setLoadingState(4);
    const sortedDataOut = sortUsersHistory(outBound);
    const outByDate = compileHistoryIntoDays(sortedDataOut);
    setSortedOutHistory(outByDate);
    setLoadingState(5);
    /*   const contracts = await connectToContracts(
      sortedDataIn.allBlocks,
      sortedDataOut.allBlocks
    ); 
    setContractInstances(contracts);
    */
    setReady(true);
  };

  const connectToContracts = async (
    blockData1: blockCount[],
    blockData2: blockCount[]
  ) => {
    const instances: {
      [contractAddress: string]: { instance: ethers.Contract; name: string };
    } = {};

    let blockData = [];
    blockData1.forEach((item) => blockData.push(item));
    blockData2.forEach((item) => blockData.push(item));

    for (let i = 0; i < blockData.length; i++) {
      const segment = blockData[i];
      for (let x = 0; x < segment[1].contracts.length; x++) {
        let address = segment[1].contracts[x];
        if (!!!instances[address]) {
          const instance = await connectToERC721Contract({
            ContractAddress: address,
            providerOrSigner: userProvider,
          });
          const name = await instance.name().catch((error) => {
            console.log("Error getting name: ", error);
            return "unknown";
          });

          instances[address] = { instance, name };
        }
      }
    }
    return instances;
  };

  return (
    <PageContainer>
      {!ready && (
        <PreLoadLayout>
          <ConnectionArea>
            <ConnectButton />
            {connected && !ready && loadingState === 0 && (
              <Button onClick={searchUsersHistory}>Search</Button>
            )}
            <LoadingNotice loadingState={loadingState} />
          </ConnectionArea>
        </PreLoadLayout>
      )}
      {ready && (
        <BodyArea>
          <HeadArea>Header here</HeadArea>
          <TimeLine
            sortedInHistory={sortedInHistory}
            sortedOutHistory={sortedOutHistory}
            ready={ready}
            handleOpenModal={handleOpenModal}
            contractInstances={contractInstances}
          />
        </BodyArea>
      )}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <></>
      </Modal>
    </PageContainer>
  );
}

export default MainPage;
