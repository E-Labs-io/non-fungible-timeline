/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faCheck,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useWeb3Provider } from "hooks/web3";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useNFTimelineProvider from "hooks/NFTimelineProvider";

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
export default function AddToSpyListButton() {
  const { walletAddress, userProvider } = useWeb3Provider();
  const { spyList, addToSpyList, activeAddress } = useNFTimelineProvider();
  const [active, setActive] = useState<boolean>(false);

  const [icon, setIcon] = useState(faPlus);

  useEffect(() => {
    if (userProvider) {
      setActive(true);
      if (spyList.searchForAddress(activeAddress.getAddress())) {
        console.log("address already in spy list");
        setIcon(faTrashCan);
      }
    } else setActive(false);
  });

  const handleButtonClick = () => {
    console.log("trying to add address: ", activeAddress);
    if (!spyList.searchForAddress(activeAddress))
      addToSpyList(walletAddress, activeAddress.getAddress()).then((result) => {
        console.log("added to list: ", result);
        if (result) setIcon(faCheck);
      });
    else console.log("Address already being spied on");
  };

  return (
    <Container>
      <Box disabled={!active}>
        <Icon onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUserSecret} />
          <FontAwesomeIcon icon={icon} />
        </Icon>
      </Box>
    </Container>
  );
}
