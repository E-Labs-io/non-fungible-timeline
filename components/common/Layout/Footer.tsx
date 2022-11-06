import React from "react";
import styled from "styled-components";

import TwitterLogoWhite from "../../../public/images/twitter-logo-white.png";
import DiscordLogoWhite from "../../../public/images/discord-logo-white.png";
import OpenseaLogoWhite from "../../../public/images/opensea-logo-white.png";
import Image from "next/image";

const FooterContainer = styled.footer`
	font-family: "Ubuntu", sans-serif;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: #9b59b6;
	padding: 0 0 15px;
	column-gap: 20px;
`;

const LogoContainer = styled.a`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 5px;
	&:hover {
		transform: scale(1.1);
	}
`;

function Footer() {
	return (
		<FooterContainer>
			<LogoContainer href="https://discord.com/app" target="_blank">
				<Image
					src={DiscordLogoWhite}
					width={30}
					height={30}
					alt="Discord logo"
				/>
			</LogoContainer>

			<LogoContainer
				href="https://twitter.com/degenexchange"
				target="_blank"
			>
				<Image
					src={TwitterLogoWhite}
					width={30}
					height={30}
					alt="Degenexchange Twitter"
				/>
			</LogoContainer>

			<LogoContainer
				href="https://opensea.io/murlyncreative"
				target="_blank"
			>
				<Image
					src={OpenseaLogoWhite}
					width={30}
					height={30}
					alt="Opensea logo"
				/>
			</LogoContainer>
		</FooterContainer>
	);
}

export default Footer;
