/** @format */

import useNFTimelineProvider from "hooks/NFTimelineProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useWeb3Provider } from "hooks/web3";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;
const Box = styled.button`
  width: 50px;
  height: 25px;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: white;
  border-style: solid;
  background-color: transparent;
  :hover {
    border-color: #2d93f8;
    color: #2d93f8;
    cursor: pointer;
  }
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function OpenSpyListButton({ handleClick }) {
  const { walletAddress, userProvider } = useWeb3Provider();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (userProvider) {
      setActive(true);
    } else setActive(false);
  });

  const handleButtonClick = () => {
    if (walletAddress) handleClick();
  };

  return (
    <Container>
      <Box disabled={!active}>
        <Icon onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUserSecret} />
          {" list"}
        </Icon>
      </Box>
    </Container>
  );
}
