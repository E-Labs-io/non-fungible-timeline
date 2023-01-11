/** @format */
import { Button, Modal } from "../common";
import { ConnectButton, useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import LoadingNotice from "./components/loadingNotice";

import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import sortUsersHistory from "../../helpers/data/sortUsersHistory";

import alchemyGetAssetTransfers from "hooks/web3/api/alchemyGetAssetTransfers";
import zeroAddress from "hooks/web3/data/zeroAddress";
import TimeLine, { dailyHistory } from "./components/timeline/TimeLine";
import compileHistoryIntoDays, {
  compileHistoryIntoDaysReturn,
} from "helpers/data/compileHistoryIntoDays";
import DayModal from "./components/modal/DayModal";

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

const ModalTitleCont = styled.div`
  display: flex;
  direction: flex;
  flex-direction: row;
  row-gap: 20px;
`;
const ModalTitle = styled.div``;

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedDayData, setSelectedDayData] = useState<dailyHistory>();

  const [selectedDate, setSelectedDay] = useState<string>();

  const [otherAddress, setOtherAddress] = useState<boolean>(false);

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
      const inBound = await alchemyGetAssetTransfers(
        from ? from : null,
        to,
        "0xAA2644"
      );
      console.log(inBound.result);
      return inBound.result.transfers;
    } else {
      // Out bounce
      const outBound = await alchemyGetAssetTransfers(from, null, "0xAA2644");
      return outBound.result.transfers;
    }
  };

  useEffect(() => {
    if (!connected && userProvider) {
      setConnected(true);
      setUsersAddress(walletAddress);
    }
    if (!!walletAddress && usersAddress !== walletAddress && !otherAddress) {
      setReady(false);
      setLoadingState(0);
      //searchUsersHistory();
    }
  });

  const handleOpenModal = (allSelectedData) => {
    setSelectedDayData(allSelectedData);

    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const searchUsersHistory = async () => {
    console.log(usersAddress);

    const inBoundTransfers = await getUsersHistory({
      to: usersAddress,
    });
    setLoadingState(2);
    const outBound = await getUsersHistory({ from: usersAddress });
    setLoadingState(3);
    const sortedDataIn = sortUsersHistory(inBoundTransfers);
    const inByDate = compileHistoryIntoDays(sortedDataIn);
    setSortedInHistory(inByDate);
    setLoadingState(4);
    const sortedDataOut = sortUsersHistory(outBound);
    const outByDate = compileHistoryIntoDays(sortedDataOut);
    setSortedOutHistory(outByDate);
    setLoadingState(5);
    setReady(true);
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
          />
        </BodyArea>
      )}
      <Modal
        title={
          selectedDayData &&
          `${selectedDayData[1]}  |  ${
            selectedDayData[0] === "left" ? "In-bound" : "Out-bound"
          }`
        }
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      >
        <DayModal allDayData={selectedDayData}></DayModal>
      </Modal>
    </PageContainer>
  );
}

export default MainPage;
