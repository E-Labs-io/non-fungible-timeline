/** @format */
import { Button, InputBox, Modal } from "../common";
import { ConnectButton, useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import LoadingNotice from "./components/loadingNotice";

import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import sortUsersHistory from "../../helpers/data/sortUsersHistory";

import alchemyGetAssetTransfers from "hooks/web3/api/alchemyGetAssetTransfers";
import zeroAddress from "hooks/web3/utils/zeroAddress";
import TimeLine, { dailyHistory } from "./components/timeline/TimeLine";
import compileHistoryIntoDays, {
  compileHistoryIntoDaysReturn,
} from "helpers/data/compileHistoryIntoDays";
import DayModal from "./components/modal/DayModal";
import { isAddress } from "@ethersproject/address";
import { ethers } from "ethers";
import ensResolver from "hooks/web3/helpers/ensResolver";
import Header from "./components/Headder";

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
  border-bottom: 2px none white;

  left: 0;
  top: 0;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 30px;
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
  min-height: 20vh;
  align-items: center;
  justify-content: center;
  padding: 5px;
  row-gap: 20px;
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.682);
`;

const Input = styled.input`
  width: ${({ width }) => (width ? width : "500px")};
  height: ${({ height }) => (height ? height : "50px")};
  margin-top: 10px;
  padding: 12px 15px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ffffff75;
`;

const PageTitle = styled.div`
  justify-content: center;
  align-items: center;

  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 70px;
  text-align: center;
`;

/**
 * @dev : Non-Fungible Timeline Home
 *
 */
interface MainPageProps {}
function MainPage({}: MainPageProps) {
  const [internalProvider, setInternalProvider] =
    useState<ethers.providers.Provider>();
  const [EnsResolver, setEnsResolver] = useState<any>();
  const [connected, setConnected] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [ready, setReady] = useState<boolean>(false);

  const [usersAddress, setUsersAddress] = useState<string>();
  const { walletAddress, userProvider, connectToGivenProvider } =
    useWeb3Provider();

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
    if (!internalProvider) {
      connectToGivenProvider("alchemy", "mainnet").then((result) => {
        setInternalProvider(result);
        ensResolver(result).then((resolver) => setEnsResolver(resolver));
      });
    }
    if (!connected && userProvider) {
      setUsersAddress(walletAddress);
      setConnected(true);
      console.log("UserEffect Check Address: ", walletAddress);
    }
    if (!!walletAddress && usersAddress !== walletAddress && !otherAddress) {
      setReady(false);
      setLoadingState(0);
      //searchUsersHistory();
    }
  });

  const handleInputChange = (input) => {
    console.log("Input Area: ", input.target.value);
    setUsersAddress(input.target.value);
  };

  const handleOpenModal = (allSelectedData) => {
    setSelectedDayData(allSelectedData);

    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const searchUsersHistory = async () => {
    if (userProvider && usersAddress !== walletAddress) setOtherAddress(true);
    setLoadingState(1);
    const isEns = EnsResolver.isENS(usersAddress);
    var searchAddress;

    if (isEns) {
      console.log("Is ENS");
      await EnsResolver.addressFromEns(usersAddress).then(
        (address) => (searchAddress = address)
      ).catch((error) => {
        console.log("ENS Doesnt Exsist : ", error);
        setLoadingState(0);
      });
    } else searchAddress = usersAddress;

    console.log(searchAddress);

    const inBoundTransfers = await getUsersHistory({
      to: searchAddress,
    });
    setLoadingState(2);
    const outBound = await getUsersHistory({ from: searchAddress });
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
    console.log("Is address: ", result, " From : ", input);
    return result;
  };

  const handleBack = () => {
    setReady(false);
    setLoadingState(0);
    setUsersAddress("");
  };
  return (
    <PageContainer>
      {!ready && (
        <PreLoadLayout>
          <PageTitle>Non-Fungible Timeline</PageTitle>
          <br />
          <ConnectionArea>
            {loadingState === 0 && (
              <>
                <ConnectButton />
                Or
                <Input
                  onChange={handleInputChange}
                  placeholder="Wallet Address or ENS"
                />
                <Button
                  onClick={searchUsersHistory}
                  disabled={handleIsDisabled(usersAddress)}
                >
                  Search
                </Button>
              </>
            )}
            <LoadingNotice loadingState={loadingState} />
          </ConnectionArea>
        </PreLoadLayout>
      )}
      {ready && (
        <BodyArea>
          <HeadArea>
            <Header
              searchAddress={usersAddress}
              onReset={() => {}}
              onBack={handleBack}
            />
          </HeadArea>
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
