/** @format */
import { Loader, Modal } from "../common";
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
import SearchAndConnectArea from "../../hooks/NFTimelineProvider/components/SearchAndConnectArea";
import useWindowSize from "hooks/window/useWindowSize";
import Introduction from "./Introduction";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { useRouter } from "next/router";

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
  const { activeTimeline } = useNFTimelineProvider();
  const [ready, setReady] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDayData, setSelectedDayData] = useState<dailyHistory>();
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [sortedOutHistory, setSortedOutHistory] =
    useState<compileHistoryIntoDaysReturn>();

  const router = useRouter();

  useEffect(() => {
    if (activeTimeline && !sortedInHistory && !sortedInHistory) {
      setSortedInHistory(activeTimeline.inByDate);
      setSortedOutHistory(activeTimeline.outByDate);

      setReady(true);
    }
    if (!activeTimeline) {
      setReady(false);
      setSortedInHistory(null);
      setSortedOutHistory(null);
      router.push("/");
    }
  });

  const handleOpenModal = (allSelectedData) => {
    setSelectedDayData(allSelectedData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

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

  return (
    <PageContainer>
      <BodyArea>
        {!ready && <Loader />}
        {ready && (
          <>
            <br />
            <UserInformation handleOpenModal={handleOpenModalFromStats} />
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