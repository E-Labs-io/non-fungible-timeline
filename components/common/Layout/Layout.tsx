/** @format */

import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

import Header from "./Header/Header";

const LayoutContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => (theme ? theme.singleTheme.gradient : "white")};
  overflow: ${({ open }) => (open ? "hidden" : "scroll")};
  //overflow: hidden;
`;

const Main = styled.div`
  font-family: "Ubuntu", sans-serif;
  position: relative;
  width: 100vw;
  height: calc(100vh - 55px); // Use calc() to calculate the height correctly
  overflow: scroll;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Layout: NextPage = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onBack = () => router.push("/");
  return (
    <LayoutContainer open={open}>
      <Header onBack={onBack} onMenu={setOpen} />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
