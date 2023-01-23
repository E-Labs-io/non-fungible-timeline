/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { device, tablet } from "constants/media";
import { ExtraStyleProps } from "types/genericTypes";

const Wrapper = styled.button<ExtraStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ width }) => width || "fit-content"};
  height: ${({ height }) => height || "fit-content"};
  cursor: pointer;
  position: relative;
  border-radius: 10px;

  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-size: ${({ fontSize }) => fontSize || "26px"};
  color: ${({ color, theme }) => color || theme.primaryDark};
  background: #ffffff88;
  box-shadow: 0px 0px 20px 5px rgba(207, 207, 207, 0.682);
  padding: ${({ padding }) => (padding ? padding : "8px")};
  margin: ${({ margin }) => (margin ? margin : "0px")};
  z-index: 1;

  @media (max-width: 768px) {
    padding: ${({ padding }) => (padding ? padding : "12px 32px 11px")};
    font-size: ${({ fontSize }) => `calc(${fontSize} * 0.84)` || "23px"};
  }

  @media (max-width: 480px) {
    padding: ${({ padding }) => (padding ? padding : "10px 22px 8px")};
    font-size: ${({ fontSize }) => `calc(${fontSize} * 0.77)` || "20px"};
  }

  &:active {
    top: 4px;
    box-shadow: 0px 0px;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;

    top: 0px;
    box-shadow: ${({ color, theme }) =>
      color ? `0px 5px ${color}` : `0px 5px ${theme.primaryDark}`};
  }
  border-style: none;
`;

const ChildrenContainer = styled.span`
  width: 100%;
`;

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderColor?: any;
  fontSize?: string;
  zIndex?: string;
  borderRadius?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  onClick?: () => void;
  leftInfo?: string | number;
  rightInfo?: string | number;
  withFlashyBackground?: boolean;
  children?: ReactElement[] | ReactElement | string;
}

function Button({
  color,
  backgroundColor,
  padding,
  borderColor,
  margin,
  fontSize,
  borderRadius,
  disabled,
  type,
  width,
  height,
  leftInfo,
  rightInfo,
  zIndex,
  onClick,
  children,
}: ButtonProps) {
  return (
    <Wrapper
      color={color}
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
      fontSize={fontSize}
      borderRadius={borderRadius}
      height={height}
      type={type}
      borderColor={borderColor}
      width={width}
      disabled={disabled}
      zIndex={zIndex}
      onClick={onClick}
    >
      {leftInfo === undefined ? <span></span> : { leftInfo }}
      <ChildrenContainer>{children}</ChildrenContainer>
      {rightInfo === undefined ? <span></span> : rightInfo}
    </Wrapper>
  );
}

export default Button;
