/** @format */
import { Modal } from "../common";
import { useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import sortUsersHistory from "../../helpers/dataSorting/sortUsersHistory";
import TimeLine, { dailyHistory } from "./components/timeline/TimeLine";
import compileHistoryIntoDays, {
  compileHistoryIntoDaysReturn,
} from "helpers/dataSorting/compileHistoryIntoDays";
import DayModal from "./components/modal/DayModal";
import { isAddress } from "@ethersproject/address";
import { ethers } from "ethers";
import ensResolver from "hooks/web3/helpers/ensResolver";
import Header from "../common/Layout/Header/Header";
import getUsersHistory from "helpers/getters/getUsersHistory";
import UserInformation from "./components/userInfo/UserInfo";
import SearchAndConnectArea from "./components/SearchAndConnectArea";
import useWindowSize from "hooks/window/useWindowSize";
import Introduction from "./components/SearchAndConnectArea/Introduction";

const PageContainer = styled.div`
  background: ${({ theme }) =>
    theme ? theme.coloredTheme.background : "white"};
  width: 100vw;
  height: 100%;
  overflow: hidden;

  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const BodyArea = styled.div`
  width: 100%;
  max-height: 100%;

  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

const PreLoad = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding-top: 10%;
`;

/**
 * @dev : Non-Fungible Timeline Home
 *
 */
interface MainPageProps {}
function MainPage({}: MainPageProps) {
  const { height } = useWindowSize();
  const { walletAddress, userProvider, connectToGivenProvider } =
    useWeb3Provider();
  const [internalProvider, setInternalProvider] =
    useState<ethers.providers.Provider>();
  const [EnsResolver, setEnsResolver] = useState<any>();
  const [connected, setConnected] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [ready, setReady] = useState<boolean>(false);
  const [usersAddress, setUsersAddress] = useState<string>();
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [sortedOutHistory, setSortedOutHistory] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDayData, setSelectedDayData] = useState<dailyHistory>();
  const [otherAddress, setOtherAddress] = useState<boolean>(false);

  const [ensError, setEnsError] = useState<boolean>(false);

  useEffect(() => {
    if (!internalProvider) {
      connectToGivenProvider("alchemy", "mainnet").then((result) => {
        setInternalProvider(result);
        ensResolver(result).then((resolver) => setEnsResolver(resolver));
      });
    }
    if (!connected && userProvider) {
      setUsersAddress(walletAddress);
      setEnsError(false);
      setConnected(true);
    }
    if (!!walletAddress && usersAddress !== walletAddress && !otherAddress) {
      setReady(false);
      setLoadingState(0);
    }
  });

  const searchUsersHistory = async () => {
    setEnsError(false);
    if (userProvider && usersAddress !== walletAddress) setOtherAddress(true);
    setLoadingState(1);
    const isEns = EnsResolver.isENS(usersAddress);
    var searchAddress;

    if (isEns) {
      await EnsResolver.addressFromEns(usersAddress).then(
        (address) => (searchAddress = address)
      );
    } else searchAddress = usersAddress;

    if (searchAddress === null) {
      console.log("ENS isn't real: ");
      setEnsError(true);
      setLoadingState(0);
      setUsersAddress(walletAddress ? walletAddress : "");
      return;
    }

    setLoadingState(2);
    const inBoundTransfers = await getUsersHistory({
      to: searchAddress,
    });
    setLoadingState(3);
    const outBound = await getUsersHistory({ from: searchAddress });
    setLoadingState(4);
    const sortedDataIn = sortUsersHistory(inBoundTransfers);
    const inByDate = compileHistoryIntoDays(sortedDataIn);
    setSortedInHistory(inByDate);
    setLoadingState(5);
    const sortedDataOut = sortUsersHistory(outBound);
    const outByDate = compileHistoryIntoDays(sortedDataOut);
    setSortedOutHistory(outByDate);

    setReady(true);
  };

  const handleInputChange = (input) => {
    setUsersAddress(input.target.value);
    setEnsError(false);
  };

  const handleOpenModal = (allSelectedData) => {
    setSelectedDayData(allSelectedData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleIsDisabled = (input: string): boolean => {
    let result = true;

    if (!!input && input.length > 5) {
      const isEns =
        input.slice(-4) === ".eth" || input.slice(-4) === ".ETH" ? true : false;

      if (isEns) {
        result = false;
      } else {
        result = !isAddress(input);
      }
    }
    return result;
  };

  const handleOpenModalFromStats = (selected: "first" | "last") => {
    let dates = [];
    Object.keys(sortedInHistory.hashes).forEach((date) => dates.push(date));
    Object.keys(sortedOutHistory.hashes).forEach((date) => dates.push(date));

    const sortedDates = dates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const date =
      selected === "first"
        ? sortedDates[0]
        : sortedDates[sortedDates.length - 1];

    const inOrOut: "left" | "right" = !!sortedInHistory.history[date]
      ? "left"
      : "right";

    const hashes =
      inOrOut === "left"
        ? sortedInHistory.hashes[date]
        : sortedOutHistory.hashes[date];

    const transactions =
      inOrOut === "left"
        ? sortedInHistory.history[date]
        : sortedOutHistory.history[date];

    let selectedDay: dailyHistory = [
      inOrOut,
      selected === "first"
        ? sortedDates[0]
        : sortedDates[sortedDates.length - 1],
      hashes,
      transactions,
    ];

    setSelectedDayData(selectedDay);

    setIsModalOpen(true);
  };

  const handleBack = () => {
    setReady(false);
    setLoadingState(0);
    setUsersAddress(walletAddress ? walletAddress : "");
  };
  return (
    <PageContainer>
      {ready && <Header onBack={handleBack} />}
      <BodyArea>
        {!ready && (
          <PreLoad>
            <SearchAndConnectArea
              handleInputChange={handleInputChange}
              searchUsersHistory={searchUsersHistory}
              handleIsDisabled={handleIsDisabled}
              loadingState={loadingState}
              usersAddress={usersAddress}
              ensError={ensError}
            />
            <br />
            {/**<Introduction /> */}
          </PreLoad>
        )}
        {ready && (
          <>
            <br />
            <UserInformation
              handleOpenModal={handleOpenModalFromStats}
              providedAddress={usersAddress}
              ensResolver={EnsResolver && EnsResolver}
              sortedInHistory={sortedInHistory}
              sortedOutHistory={sortedOutHistory}
            />

            <TimeLine
              sortedInHistory={sortedInHistory}
              sortedOutHistory={sortedOutHistory}
              ready={ready}
              handleOpenModal={handleOpenModal}
            />
          </>
        )}
      </BodyArea>

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
