/** @format */

import StateSkeleton from "components/common/SkeletonLoader";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StatBox = styled.div`
  width: 150px;
  height: 60px;
  box-shadow: 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  row-gap: 10%;
  :hover {
    scale: ${({ active }) => (active ? "1.05" : "1")};
    cursor: ${({ active }) => (active ? "pointer" : "default")};
    color: ${({ active }) => (active ? "#49c2ff" : "white")};
  }
`;
const StatTitle = styled.div`
  height: 25%;
  width: 100%;
  padding: 3px;
  padding-top: 8%;
  text-align: center;
  font-size: 0.8em;
  align-items: center;
  justify-content: center;
`;

const Stat = styled.div`
  height: 75%;
  width: 100%;
  padding: 3px;
  text-align: center;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
`;

interface StatsBoxProps {
  title?: string;
  stat?: string | number;
  active?: true;
  onClick?: () => void;
}

function UserStatsBox({ title, stat, active, onClick }: StatsBoxProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready && title && stat) {
      setReady(true);
    }
  });

  return (
    <StatBox active={active} onClick={onClick}>
      {!ready && (
        <StateSkeleton
          height="60px"
          width="150px"
          colorA="#3298ce"
          colorB="#a82da4"
          color="white"
        />
      )}
      <StatTitle>{title && title}</StatTitle>
      <Stat>{stat && stat}</Stat>
    </StatBox>
  );
}

export default UserStatsBox;
