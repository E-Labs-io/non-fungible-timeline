/** @format */
import React, { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { Loader } from "../../../components/common";
import { AlchemyGetAddressNFTs } from "../api/alchemyGetters";
import { SingleNFTDataType } from "../types/nftTypes";

const PageContainer = styled.div``;
const OwnersNFTContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;
const MenuContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ControlText = styled.a`
  color: ${({ color }) => (color ? color : "black")};
  text-align: center;
  padding: 4px;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
`;

const PageNumbers = styled.a`
  color: ${({ color }) => (color ? color : "black")};
  text-align: center;
  padding: 4px;
`;

interface NFTPaginateProps {
  searchOptions: {
    address: string;
    contractAddresses?: string[];
  };
  itemsPerPage: number;
  Children: any;
  apiInstance?: any;
  scrollToTop: Function;
}

function NFTPaginate({
  searchOptions,
  itemsPerPage,
  Children,
  apiInstance,
  scrollToTop,
}: NFTPaginateProps) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [nextPageKey, setNextPageKey] = useState<string>();
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [pageData, setPageData] = useState<any>([[]]);
  const addToPageData = (pageData: SingleNFTDataType[]) =>
    setPageData((currentData) => [...currentData, pageData]);

  const [firstRun, setFirstRun] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const changePageInt = 100;

  const getUsersNFTs = async (pageKey?: string) =>
    AlchemyGetAddressNFTs({
      address: searchOptions.address,
      api: apiInstance,
      options: {
        pageSize: itemsPerPage,
        pageKey: pageKey ? pageKey : null,
        contractAddresses: searchOptions.contractAddresses
          ? searchOptions.contractAddresses
          : null,
      },
    }).then(({ collection, pageKey, totalCount }) => {
      console.log("getUserData Rout");
      setCurrentItems(collection);
      addToPageData(collection);
      setNextPageKey(pageKey);
      setLoaded(true);
      return { totalCount, pageKey };
    });

  useEffect(() => {
    // Fetch items from another resources
    if (!firstRun) {
      setFirstRun(true);
      getUsersNFTs().then(({ totalCount, pageKey }) => {
        setPageCount(Math.ceil(totalCount / itemsPerPage));
      });
    }
  });

  // Invoke when user click to request another page.
  const handleNextPage = () => {
    setLoaded(false);
    scrollToTop();
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 === pageData.length) getUsersNFTs(nextPageKey);
    else {
      console.log("Next Page got data");
      setCurrentItems(pageData[currentPage + 1]);
      setTimeout(() => {
        setLoaded(true);
      }, changePageInt);
    }
  };
  // Invoke when user click to request go back page.
  const handleBackPage = () => {
    setLoaded(false);
    scrollToTop();
    setCurrentItems(pageData[currentPage - 1]);
    setCurrentPage(currentPage - 1);
    setTimeout(() => {
      setLoaded(true);
    }, changePageInt);
  };

  return (
    <PageContainer>
      {!loaded && <Loader />}
      <OwnersNFTContainer>
        {loaded && <Children currentNFTs={currentItems} />}
      </OwnersNFTContainer>
      <MenuContainer>
        {currentPage > 1 && (
          <ControlText onClick={handleBackPage}> {"< "}Back </ControlText>
        )}
        {"  "}
        <PageNumbers>
          {" "}
          | {currentPage} / {pageCount} |{" "}
        </PageNumbers>
        {"  "}
        {currentPage < pageCount && (
          <ControlText onClick={handleNextPage}>Next {" >"}</ControlText>
        )}
      </MenuContainer>
    </PageContainer>
  );
}

export default NFTPaginate;
