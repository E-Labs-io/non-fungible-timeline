/** @format */
import React, { useState, useMemo } from "react";
import styled, { useTheme, keyframes, css } from "styled-components";

import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";


const ExtentionWrapper = styled.div`
	width: 100%;
	padding: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 5px solid black;
	border-radius: 10px;
`;

const ExtentionBasicInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: left;
`;
const ExtentionTraitsInfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ExtentionTraitContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30%;
	text-align: left;
	border: 2px solid black;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	height: 75x;
	padding: 2px;
	background: ${({ theme }) => theme.offWhite};
`;
const ExtentionTitleContainer = styled.h2`
	text-align: left;
	margin: 0 0 10px;
	color: ${({ theme }) => theme.primaryDark};
`;
const ExtentionTextContainer = styled.h3`
	margin: 0;
	color: ${({ theme }) => theme.primaryDark};
`;
const ExtentionTraitTitleContainer = styled.h2`
	text-align: left;
	font-size: ${({ theme }) => theme.fontSizes.small};
	margin: 0 0 5px;
	color: ${({ theme }) => theme.primaryDark};
`;

const ExtentionTraitTextContainer = styled.h3`
	font-size: ${({ theme }) => theme.fontSizes.medium};
	margin: 0;
	color: ${({ theme }) => theme.primaryDark};
`;

interface NFTModalInterface {
	nftData: any;
	meta?: any;
	title?: string;
	extraText?: string;
	showTraits?: boolean;
}

function NFTModalExtention({
	nftData,
	meta,
	title,
	extraText,
	showTraits,
}: NFTModalInterface) {
	return (
		<ExtentionWrapper>
			<ExtentionTitleContainer>{title}</ExtentionTitleContainer>
			<ExtentionBasicInfoContainer>
				<ExtentionTitleContainer>{meta?.name}</ExtentionTitleContainer>
				<ExtentionTextContainer>
					{nftData?.name} ({nftData?.symbol})
				</ExtentionTextContainer>

				<ExtentionTextContainer>
					{nftData?.contract_type}
				</ExtentionTextContainer>
				<a
					href={buildNetworkScanLink({
						network: "rinkeby",
						tokenId: nftData.token_id,
						address: nftData.token_address,
					})}
					target="_blank"
				>
					View on Etherscan
				</a>
				<br />
				<ExtentionTitleContainer>
					{meta?.description && "Description"}
				</ExtentionTitleContainer>
				<ExtentionTextContainer>
					{meta?.description}
				</ExtentionTextContainer>
			</ExtentionBasicInfoContainer>
			<br />
			<br />
			<ExtentionTraitsInfoContainer>
				{meta?.attributes &&
					meta.attributes.map((trait, index) => (
						<TraitContainer
							traitName={trait.trait_type}
							traitValue={trait.value}
							key={index}
						/>
					))}
			</ExtentionTraitsInfoContainer>
		</ExtentionWrapper>
	);
}

export default NFTModalExtention;

const TraitContainer = ({ traitName, traitValue }) => {
	return (
		<ExtentionTraitContainer>
			<ExtentionTraitTitleContainer>
				{traitName}
			</ExtentionTraitTitleContainer>
			<ExtentionTraitTextContainer>
				{traitValue}
			</ExtentionTraitTextContainer>
		</ExtentionTraitContainer>
	);
};
