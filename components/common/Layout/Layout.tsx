/** @format */

import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";

const LayoutContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => (theme ? theme.coloredTheme.gradient : "white")};
`;

const Main = styled.main`
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
`;

const Layout: NextPage = ({ children }) => {
  const router = useRouter();

  const onBack = () => router.push("/");
  return (
    <LayoutContainer>
      <Header onBack={onBack} />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
