/** @format */

import React, { useEffect, useMemo, useState, useRef, Children } from "react";
import { device } from "config/media";
import styled from "styled-components";

interface GenericCompProps {
  children: any;
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  padding?: string;
  borderStyle?: string;
  borderColor?: string;
  borderWidth?: string;
  textAlign?: string;
}

const TitleComp = styled.h1`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ testAlign }) => (testAlign ? testAlign : "center")};
  color: ${({ theme, color }) => (color ? color : theme.offWhite)};
  padding: ${({ padding }) => (padding ? padding : "50px")};
  margin: 0;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 8vw;
  }
`;

export const Title = ({
  children,
  color,
  fontSize,
  padding,
  textAlign,
  fontWeight,
}: GenericCompProps) => (
  <TitleComp
    color={color}
    fontSize={fontSize}
    padding={padding}
    textAlign={textAlign}
    fontWeight={fontWeight}
  >
    {children}
  </TitleComp>
);

const SubTitleComp = styled.h2`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ testAlign }) => (testAlign ? testAlign : "center")};
  color: ${({ theme, color }) => (color ? color : theme.offWhite)};
  padding: ${({ padding }) => (padding ? padding : "20px")};
  margin: 0;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 8vw;
  }
`;

export const SubTitle = ({
  children,
  color,
  fontSize,
  padding,
  textAlign,
  fontWeight,
}: GenericCompProps) => (
  <SubTitleComp
    color={color}
    fontSize={fontSize}
    padding={padding}
    textAlign={textAlign}
    fontWeight={fontWeight}
  >
    {children}
  </SubTitleComp>
);

