/** @format */

import { Button, Loader } from "components/common";
import useNFTimelineProvider from "providers/NFTimelineProvider";
import postVote from "providers/NFTimelineProvider/api/postVote";
import { useWeb3Provider } from "e-labs_web3provider";
import { WalletEtherscanLink } from "e-labs_web3provider";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { votingCategoriesType, votingCategoryList } from "types/votingTypes";

const Container = styled.div`
  max-height: 600px;
  max-width: 600px;
  color: black;
  padding: 20px;
`;

const TitleBlock = styled.div`
  width: 100%;
  padding: 5px;
`;
const CategoryName = styled.div`
  font-size: auto;
  font-size: 2rem;
`;
const SelectedWallet = styled.div`
  font-size: 1.2rem;
`;
const VotingInfo = styled.div``;
const CategoryVoteCount = styled.div`
  font-size: auto;
`;
const ButtonContainer = styled.div`
  width: 100%;
  justify-content: right;
  display: flex;
  padding: 10px;
`;

interface VotingModalProps {
  categoryType: votingCategoriesType;
  category: votingCategoryList;
}
function VotingModal({ categoryType, category }: VotingModalProps) {
  //  Hooks
  const { activeAddress, checkIfAddressVoted, removeVote } =
    useNFTimelineProvider();
  const { userSigner, userSignMessage, walletAddress } = useWeb3Provider();
  //    State
  const [process, setProcess] = useState(6);

  useEffect(() => {
    //  Check if the singer has already voted for this wallet
    if (userSigner && process === 6)
      checkIfAddressVoted(
        categoryType,
        walletAddress,
        activeAddress.getAddress()
      ).then((result) => (result ? setProcess(4) : setProcess(0)));
  });

  const handleVoteClick = async () => {
    setProcess(1);
    //  Sign message to prove of user
    const signedMessage = await userSignMessage(
      userSigner,
      `NFTimeline: Giving ${activeAddress} a vote for ${category.title}`
    ).catch((error) => {
      console.log("ERROR Signing Message: ", error);
      setProcess(0);
    });
    setProcess(2);
    if (signedMessage) {
      //  Add the vote to the database
      await postVote(categoryType, {
        voter: walletAddress,
        votedFor: activeAddress.getAddress(),
        timestamp: new Date(),
      }).then((result) => {
        setProcess(result);
      });
    } else {
    }
  };

  const unVoteClick = async () => {
    setProcess(6);
    removeVote(categoryType, walletAddress, activeAddress.getAddress()).then(
      (result) => {
        if (result) setProcess(7);
        else setProcess(6);
      }
    );
  };

  if (!userSigner)
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You need to connect your wallet to vote!
          </SelectedWallet>
        </TitleBlock>
      </Container>
    );
  else if (process === 6)
    //    Checking Vote Status
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <Loader />
        </TitleBlock>
        <ButtonContainer>
          <Button disabled={!category.active} onClick={handleVoteClick}>
            Vote
          </Button>
        </ButtonContainer>
      </Container>
    );
  else if (process === 0)
    //    Starting State
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You are voting{" "}
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />{" "}
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>
            Voting costs nothing, and only requires a signed message.
          </VotingInfo>
        </TitleBlock>
        <ButtonContainer>
          <Button disabled={!category.active} onClick={handleVoteClick}>
            Vote
          </Button>
        </ButtonContainer>
      </Container>
    );
  else if (process === 1)
    //    Singing Message Sate
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You are voting{" "}
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>
            Signing message, please confirm in your wallet.
          </VotingInfo>
        </TitleBlock>
        <Loader />
      </Container>
    );
  else if (process === 2)
    //    Saving to DB State
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You are voting{" "}
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>Signing complete, placing your vote!</VotingInfo>
        </TitleBlock>
        <Loader />
      </Container>
    );
  else if (process === 3)
    //    Saving to DB State
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You are voting{" "}
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>
            Sorry there has been an error, please refresh and try again
          </VotingInfo>
        </TitleBlock>
        <Loader />
      </Container>
    );
  else if (process === 4)
    //    Already Voted
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            You already voted{" "}
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>Would you like to un vote this wallet?</VotingInfo>
        </TitleBlock>
        <ButtonContainer>
          <Button disabled={false} onClick={unVoteClick}>
            Un-Vote
          </Button>
        </ButtonContainer>
      </Container>
    );
  else if (process === 5)
    //    Saving to DB State
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            Done! You voted
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
          <VotingInfo>How about exploring some new wallets</VotingInfo>
        </TitleBlock>
      </Container>
    );
  else if (process === 6)
    //    Removing Vote
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>Processing your un-vote</SelectedWallet>
        </TitleBlock>
      </Container>
    );
  else if (process === 7)
    //    Removing Vote
    return (
      <Container>
        <TitleBlock>
          <CategoryName>
            {category.label} - {category.title}
          </CategoryName>
          <SelectedWallet>
            Done, you removed you vote for
            <WalletEtherscanLink walletAddress={activeAddress.getAddress()} />
            as a {category.title}!
          </SelectedWallet>
        </TitleBlock>
      </Container>
    );
}

export default VotingModal;
