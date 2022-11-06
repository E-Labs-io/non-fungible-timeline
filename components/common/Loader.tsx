/** @format */

import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ellipsis1Animation1 = keyframes`
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
`;

const ellipsis1Animation2 = keyframes`
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(24px, 0);
	}
`;

const ellipsis1Animation3 = keyframes`
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
`;

const LoaderContainer = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div:nth-child(1) {
		left: 8px;
		animation: ${ellipsis1Animation1} 0.6s infinite;
	}

	div:nth-child(2) {
		left: 8px;
		animation: ${ellipsis1Animation2} 0.6s infinite;
	}

	div:nth-child(3) {
		left: 32px;
		animation: ${ellipsis1Animation2} 0.6s infinite;
	}

	div:nth-child(4) {
		left: 56px;
		animation: ${ellipsis1Animation3} 0.6s infinite;
	}
`;

const LoaderDot = styled.div`
	position: absolute;
	top: 33px;
	width: 13px;
	height: 13px;
	border-radius: 50%;
	background: ${({ theme }) => theme.primaryDark};
	animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

function Loader() {
	return (
		<Container>
			<LoaderContainer>
				<LoaderDot />
				<LoaderDot />
				<LoaderDot />
				<LoaderDot />
			</LoaderContainer>
		</Container>
	);
}

export default Loader;
