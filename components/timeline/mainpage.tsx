/** @format */
import { Loader, Modal } from "../common";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TimeLine, { dailyHistory } from "./components/timeline/TimeLine";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import DayModal from "./components/modal/DayModal";
import UserInformation from "./components/userInfo/UserInfo";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { useRouter } from "next/router";
import VotingModal from "./components/userInfo/components/voting/VotingModal";
import { votingCategoriesType, votingCategoryList } from "types/votingTypes";

const PageContainer = styled.div`
  background: ${({ theme }) => (theme ? theme.coloredTheme.gradient : "white")};
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

type TModalType = "nft" | "vote";

/**
 * @dev : Non-Fungible Timeline Home
 *
 */
interface MainPageProps {}
function MainPage({}: MainPageProps) {
  const { activeTimeline } = useNFTimelineProvider();
  const [ready, setReady] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDayData, setSelectedDayData] =
    useState<dailyHistory>(undefined);
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [sortedOutHistory, setSortedOutHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [modalType, seTModalType] = useState<TModalType>();
  const [voteCategory, setVoteCategory] = useState<votingCategoriesType>();
  const [selectedCategory, setSelectedCategory] =
    useState<votingCategoryList>();

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

  const handleCloseModal = () => {
    seTModalType(null);
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
    seTModalType("nft");
    setIsModalOpen(true);
  };
  const handleOpenModalNFT = (allSelectedData) => {
    setSelectedDayData(allSelectedData);
    seTModalType("nft");
    setIsModalOpen(true);
  };
  const handleOpenModalFromVote = (
    selected: votingCategoriesType,
    category: votingCategoryList
  ) => {
    console.log("open Vote Modal : ", selected);
    setVoteCategory(selected);
    setSelectedCategory(category);
    seTModalType("vote");
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

  const modalTitle = (modalType: TModalType) => {
    if (modalType === "nft") {
      return `${selectedDayData[1]}  |  ${
        selectedDayData[0] === "left" ? "In-bound" : "Out-bound"
      }`;
    } else if (modalType === "vote") {
      return "Voting Time";
    }
  };

  const modalContent = (modalType) => {
    if (modalType === "nft") return <DayModal allDayData={selectedDayData} />;
    if (modalType === "vote")
      return (
        <VotingModal categoryType={voteCategory} category={selectedCategory} />
      );
    return null;
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
              handleOpenModal={handleOpenModalNFT}
            />
          </>
        )}
      </BodyArea>

      <Modal
        title={isModalOpen && modalTitle(modalType)}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      >
        {modalContent(modalType)}
      </Modal>
    </PageContainer>
  );
}

export default MainPage;
