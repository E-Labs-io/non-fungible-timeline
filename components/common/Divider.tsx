import React from "react";
import styled from "styled-components";

const DividerComp = styled.hr`
	align-items: center;
	border-top-width: ${({ borderWidth }) => borderWidth || "4px"};
	border-top-style: ${({ borderStyle }) => borderStyle || "solid"};
	border-top-color: ${({ borderColor }) => borderColor || "black"};
	width: ${({ width }) => width || "100%"};
	margin: ${({ margin }) => margin || "0"};
`;
interface DividerProps {
	borderColor?: string;
	borderWidth?: string;
	width?: string;
	borderStyle?: string;
	margin?: string;
}
const Divider = ({
	borderColor,
	borderWidth,
	width,
	borderStyle,
	margin,
}: DividerProps) => {
	return (
		<DividerComp
			borderWidth={borderWidth}
			borderColor={borderColor}
			width={width}
			borderStyle={borderStyle}
			margin={margin}
		/>
	);
};

export default Divider;
