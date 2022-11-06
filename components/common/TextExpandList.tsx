import React, { Fragment } from "react";
import styled, { useTheme } from "styled-components";

import { Divider } from "components/common";
import TextExpand from "./TextExpand";
import { device } from "config/media";

const Wrapper = styled.dl`
	width: 100%;
	max-width: 70vw;
	display: flex;
	flex-direction: column;
	font-size: ${({ theme }) => theme.fontSizes.medium};
	text-align: left;

	@media ${device.tablet} {
		max-width: 80vw;
	}

	@media ${device.mobileL} {
		max-width: 90vw;
	}
`;

interface TextExpandListProps {
	data: { title: string; content?: string }[];
}

function TextExpandList({ data }: TextExpandListProps) {
	const theme = useTheme();
	const dataLength = data && data.length;
	return (
		<Wrapper>
			{data.length
				? data.map((item, index) => (
						<Fragment key={index}>
							<TextExpand
								title={item.title}
								content={item?.content}
							/>
							{index + 1 < dataLength ? (
								<Divider
									borderColor={theme.primaryLight}
									borderWidth="1px"
									margin="12px 0"
								/>
							) : null}
						</Fragment>
				  ))
				: null}
		</Wrapper>
	);
}

export default TextExpandList;
