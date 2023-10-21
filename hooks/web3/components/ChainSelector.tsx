/** @format */

import { Network } from "alchemy-sdk";
import { FC, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import SVG from "react-inlinesvg";
import { Tooltip } from "react-tooltip";
import { NetworkKeys, ChainsIcons, ActiveChainIndex } from "../types/Chains";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { ChainIcons } from "../constants/avalabuleChains";

const Wrapper = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  row-gap: 10px;
`;

const ChainIconContainer = styled.div`
  height: 50px;
  width: 50px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background-size: cover;
  border-color: ${({ selected }) => (selected ? "cyan" : "white")};
  border-width: 1px;
  border-style: solid;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ style }) => style}
`;

const ChainIconSVG = styled(SVG)`
  border-radius: 50%;
`;

export interface ChianSelectorProps {
  availableChains: NetworkKeys[];
  autoActiveChains?: NetworkKeys[];
  onSelectedChain?: (action: "add" | "remove", chain: NetworkKeys) => void;
  style?: ChainSelectorStyles;
  notForProvider?: true;
  activeChainStream?: ActiveChainIndex;
}

export interface ChainSelectorStyles {
  borderColor?: string;
  hoverBorderColor?: string;
}

const ChainSelector = ({
  availableChains,
  autoActiveChains,
  onSelectedChain,
  style,
  notForProvider,
  activeChainStream,
}: ChianSelectorProps) => {
  const { selectedChains, onSelectedChainChange } = useWeb3Provider();
  const [activeChains, setActiveChains] =
    useState<ActiveChainIndex>(selectedChains);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
      const active = activeChains;
      if (autoActiveChains?.length > 0) {
        for (let i = 0; i < autoActiveChains.length; i++) {
          active[autoActiveChains[i]] = true;
        }
      } else if (selectedChains) {
        Object.keys(selectedChains).forEach((key) => {
          active[key] = selectedChains[key];
        });
      }
      setActiveChains(active);
      return;
    }
  });

  useEffect(() => {
    selectedChains && setActiveChains(selectedChains);
  }, [selectedChains]);

  useEffect(() => {
    activeChainStream && setActiveChains(activeChainStream);
  }, [activeChainStream]);

  const onSelection = (chainId: NetworkKeys) => {
    if (activeChains[chainId]) {
      if (!notForProvider) onSelectedChainChange("remove", chainId);
      onSelectedChain && onSelectedChain("remove", chainId);

      const prevState = activeChains;
      setActiveChains({ ...prevState, [chainId]: false });
    } else {
      if (!notForProvider) onSelectedChainChange("add", chainId);
      onSelectedChain && onSelectedChain("add", chainId);

      const prevState = activeChains;
      setActiveChains({ ...prevState, [chainId]: true });
    }
  };

  return (
    <Wrapper>
      {availableChains &&
        availableChains.map((chainId, key) => (
          <ChainIconContainer
            data-tooltip-id="ChainSelector"
            data-tooltip-content={ChainIcons[chainId].toolTip}
            onClick={() => onSelection(chainId)}
            selected={activeChains[chainId]}
            key={key}
            style={style}
          >
            <ChainIconSVG src={ChainIcons[chainId].icon} />
          </ChainIconContainer>
        ))}
      <Tooltip id="ChainSelector" place="bottom" delayShow={1500} />
    </Wrapper>
  );
};

export default ChainSelector;
