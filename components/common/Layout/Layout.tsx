/** @format */

import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";

const Main = styled.main`
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
`;

const Layout: NextPage = ({ children }) => {
  const router = useRouter();

  const onBack = () => router.push("/");
  return (
    <>
      <Header onBack={onBack} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
