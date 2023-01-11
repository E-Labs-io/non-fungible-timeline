/** @format */

import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../components/common";
import useWeb3Provider from "../hooks/useWeb3Provider";
import switchMetamaskNetwork from "../utils/metamaskSwitchNetwork";

const NetworkWarningWrapper = styled.div`
  padding-top: 5px;
  position: absolute;
  border: ${({ theme }) => `4px solid ${theme.primaryLight}`};
  border-radius: 5px;
  border-color: ${({ color }) =>
    color ? color : ({ theme }) => `${theme.primaryDark}`};
  color: ${({ color }) =>
    color ? color : ({ theme }) => `${theme.primaryDark}`};
  padding: 20px;
  top: 10vh;
  z-index: 300;
  background: ${({ color }) =>
    color ? color : ({ theme }) => `${theme.primaryLight}`};
  margin: 100px 10px 10px;
  max-width: 90vw;
`;

const Title = styled.h2`
  text-align: center;
`;

const BoldText = styled.a`
  font-weight: bold;
  color: ${({ color }) =>
    color ? color : ({ theme }) => `${theme.primaryDark}`};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "center"};
  color: ${({ theme }) => theme.color};
`;

export interface NetworkWarningProps {
  requiredNetwork: string;
  callback?: (connected: boolean) => void;
}

const NetworkWarning = ({ requiredNetwork, callback }: NetworkWarningProps) => {
  const [network, setNetwork] = useState();
  const [show, setShow] = useState(false);
  const { auxStorage, userProvider } = useWeb3Provider();

  useEffect(() => {
    if (!userProvider) return;
    else {
      if (auxStorage?.network?.name && auxStorage.network.name !== network)
        setNetwork(auxStorage.network?.name);
      if (requiredNetwork !== network) {
        setShow(true);
        callback ? callback(false) : null;
      } else {
        callback ? callback(true) : null;
        setShow(false);
      }
    }
  }, [network, auxStorage, userProvider]);

  if (show)
    return (
      <NetworkWarningWrapper>
        {" "}
        <Title>Please change network</Title>
        <Text>
          This dApp runs on <BoldText>{requiredNetwork}</BoldText>
        </Text>
        <Text>
          You are currently connected to{" "}
          <BoldText color={"red"}>{network}</BoldText>
        </Text>
        <ButtonContainer>
          <Button onClick={() => switchMetamaskNetwork(requiredNetwork)}>
            Change network
          </Button>
        </ButtonContainer>
      </NetworkWarningWrapper>
    );
  if (!show) return null;
};

export default NetworkWarning;
