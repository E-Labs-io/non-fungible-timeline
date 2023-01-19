/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { device } from "config/media";

const Wrapper = styled.div`
  width: 100%;
  max-width: 70vw;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  @media ${device.tablet} {
    max-width: 80vw;
  }

  @media ${device.mobileL} {
    max-width: 90vw;
  }
  box-shadow: 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  border-radius: 10px;
  padding: 5px;
`;

const TitleContainer = styled.button`
  display: flex;
  justify-content: space-between;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  padding: 5px 0;
`;

const Title = styled.dt`
  font-weight: bold;
  text-align: left;
`;

const CaretContainer = styled.div`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s;
  margin-right: 20px;
`;

const Content = styled.dd`
  font-size: ${({ theme }) => theme.fontSizes.small};
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0px")};
  overflow: hidden;
  transition: ${({ isOpen }) =>
    isOpen ? "max-height 0.8s ease-out" : "max-height 0.5s ease-in"};
  margin-inline-start: 10px;
  box-sizing: border-box;
  padding-right: 15px;
  :before {
    content: "";
    display: block;
    padding-bottom: 10px;
  }
  :after {
    content: "";
    display: block;
    padding-bottom: 15px;
  }
`;

interface TextExpandProps {
  title: string;
  content?: string;
}

function TextExpand({ title, content }: TextExpandProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <TitleContainer aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Title>{title}</Title>
        {content ? (
          <CaretContainer isOpen={isOpen}>
            <FontAwesomeIcon icon={faCaretDown} />
          </CaretContainer>
        ) : (
          <div></div>
        )}
      </TitleContainer>
      {content ? <Content isOpen={isOpen}>{content}</Content> : null}
    </Wrapper>
  );
}

export default TextExpand;
