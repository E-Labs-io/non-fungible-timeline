/** @format */
import React, { useState, useMemo, useEffect } from "react";
import styled, { useTheme, keyframes, css } from "styled-components";
const MenuContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
`;
const ControlText = styled.a`
  color: ${({ color }) => (color ? color : "white")};
  text-align: center;
  padding: 4px;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
`;

const PageNumbers = styled.a`
  color: ${({ color }) => (color ? color : "white")};
  text-align: center;
  padding: 4px;
`;
interface PaginationSimpleMenuProps {
  currentPage: number;
  pageCount: number;
  handleNextPage: () => void;
  handleBackPage: () => void;
  color?: string;
}
const PaginationSimpleMenu = ({
  currentPage,
  pageCount,
  handleNextPage,
  handleBackPage,
  color,
}: PaginationSimpleMenuProps) => (
  <MenuContainer>
    {currentPage > 1 && (
      <ControlText onClick={handleBackPage} color={color}>
        {" "}
        {"< "}Back{" "}
      </ControlText>
    )}
    {"  "}
    <PageNumbers color={color}>
      {" "}
      | {currentPage} / {pageCount} |{" "}
    </PageNumbers>
    {"  "}
    {currentPage < pageCount && (
      <ControlText color={color} onClick={handleNextPage}>
        Next {" >"}
      </ControlText>
    )}
  </MenuContainer>
);
export default PaginationSimpleMenu;
