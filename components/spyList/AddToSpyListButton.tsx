/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faCheck,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useWeb3Provider } from "e-labs_web3provider";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useNFTimelineProvider from "providers/NFTimelineProvider";

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
  const {
    spyList,
    addToSpyList,
    activeAddress,
    getSpyList,
    removeFromSpyList,
  } = useNFTimelineProvider();
  const [active, setActive] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);

  const [icon, setIcon] = useState(faPlus);

  useEffect(() => {
    if (userProvider && spyList) {
      setActive(true);
      if (!working) {
        if (spyList.searchForAddress(activeAddress.getAddress())) {
          console.log("address in spy list");
          setIcon(faTrashCan);
        } else {
          console.log("address is not in spy list");
          setIcon(faPlus);
        }
      }
    } else if (userProvider && !spyList) {
      getSpyList(walletAddress).then((result) => {
        if (!working) {
          if (result.searchForAddress(activeAddress.getAddress())) {
            console.log("address in spy list");
            setIcon(faTrashCan);
          } else {
            console.log("address is not in spy list");
            setIcon(faPlus);
          }
        }
        setActive(true);
      });
    } else setActive(false);
  });

  const handleButtonClick = () => {
    setWorking(true);
    console.log("trying to add address: ", activeAddress);
    console.log(spyList.searchForAddress(activeAddress));
    if (!spyList.searchForAddress(activeAddress))
      addToSpyList(walletAddress, activeAddress.getAddress()).then((result) => {
        console.log("added to list: ", result);
        if (result) setIcon(faCheck);
        setWorking(false);
      });
    else {
      removeFromSpyList(walletAddress, activeAddress.getAddress()).then(
        (result) => {
          console.log(
            "remove address from spy list: ",
            activeAddress.getAddress()
          );

          if (result) setIcon(faPlus);
          setWorking(false);
        }
      );
    }
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
