import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";

const Main = styled.main`
	font-family: "Ubuntu", sans-serif;
	box-sizing: border-box;
`;

const Layout: NextPage = ({ children }) => {
	return (
		<>
			<Header />
			<Main>{children}</Main>
		</>
	);
};

export default Layout;
