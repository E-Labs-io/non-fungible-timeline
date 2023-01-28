/** @format */
import { Loader, Modal } from "../common";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TimeLine, { dailyHistory } from "./components/timeline/TimeLine";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import DayModal from "./components/modal/DayModal";
import UserInformation from "./components/userInfo/UserInfo";
import useWindowSize from "hooks/window/useWindowSize";
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
  const [selectedDayData, setSelectedDayData] =
    useState<dailyHistory>(undefined);
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
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDayData(undefined);
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

  const handleOpenModalFromActiveDay = (
    date: string,
    direction: "in" | "out"
  ) => {
    const hashes =
      direction === "in"
        ? sortedInHistory.hashes[date]
        : sortedOutHistory.hashes[date];
    let transactions =
      direction === "in"
        ? sortedInHistory.history[date]
        : sortedOutHistory.history[date];

    let selectedDay: dailyHistory = [
      direction === "in" ? "left" : "right",
      date,
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
            <UserInformation
              handleOpenModalForFirstAndLast={handleOpenModalFromStats}
              handelOpenModalForActiveDate={handleOpenModalFromActiveDay}
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
