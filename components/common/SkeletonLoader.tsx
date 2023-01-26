/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SkeletonPulse = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${({ color }) => color ?? "inherit"};
  height: ${({ height }) => height ?? "100%"};
  width: ${({ width }) => width ?? "100%"};
  background: ${({ colorA, colorB }) =>
    `linear-gradient(-90deg, ${colorA ? colorA : "#656565"} 0%,  ${
      colorB ? colorB : "#b9b9b924"
    } 50%,  ${colorA ? colorA : "#656565"} 100%);`};
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;
interface StateSkeletonProps {
  height?: string;
  width?: string;
  message?: string;
  colorA?: string;
  colorB?: string;
  color?: string;
}
const StateSkeleton = ({
  height,
  width,
  message,
  color,
  colorA,
  colorB,
}: StateSkeletonProps) => {
  return (
    <SkeletonPulse
      height={height}
      width={width}
      color={color}
      colorA={colorA}
      colorB={colorB}
    >
      {message && message}
    </SkeletonPulse>
  );
};

export default StateSkeleton;
