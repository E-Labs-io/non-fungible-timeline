/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SkeletonPulse = styled.div`
  height: ${({ height }) => height ?? "null"};
  width: ${({ width }) => width ?? "null"};
  max-width: ${({ maxWidth }) => maxWidth ?? "null"};
  max-height: ${({ maxHeight }) => maxHeight ?? "null"};
  align-items: center;
  border: ${({ border }) => (border ? border : "none")};
  justify-content: center;
  overflow: inherit;
  border-radius: inherit;
  position: absolute;
  opacity: ${({ opacity }) => opacity ?? "100%"};
  color: ${({ color }) => color ?? "inherit"};

  padding: ${({ padding }) => padding ?? "0"};
  background: ${({ colorA, colorB }) =>
    `linear-gradient(-90deg, ${colorA ? colorA : "#656565"} 0%,  ${
      colorB ? colorB : "#b9b9b924"
    } 50%,  ${colorA ? colorA : "#656565"} 100%);`};
  background-size: 400% 400%;
  animation: pulse 2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

const Message = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;
interface StateSkeletonProps {
  height?: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  message?: string;
  colorA?: string;
  colorB?: string;
  color?: string;
  padding?: string;
  opacity?: string;
  border?: string;
}
const StateSkeleton = ({
  height,
  width,
  message,
  color,
  colorA,
  colorB,
  padding,
  opacity,
  border,
}: StateSkeletonProps) => {
  return (
    <SkeletonPulse
      height={height}
      width={width}
      maxWidth={width}
      maxHeight={height}
      color={color}
      colorA={colorA}
      colorB={colorB}
      padding={padding}
      opacity={opacity}
      border={border}
    >
      {message && <Message>{message}</Message>}
    </SkeletonPulse>
  );
};

export default StateSkeleton;
