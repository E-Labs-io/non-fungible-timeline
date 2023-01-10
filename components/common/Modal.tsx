/** @format */

import React, { FunctionComponent, ReactElement } from "react";
import styled, { useTheme } from "styled-components";
import ReactModal from "react-modal";
import Confetti from "react-confetti";
import { Button } from "./index";

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDark};
`;

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string | JSX.Element;
  style?: any;
  children: ReactElement;
  removeCross?: boolean;
  confetti?: boolean;
  customConfetti?: any;
}
import { theme } from "../../styles/theme";
import useWindowSize from "../../hooks/window/useWindowSize";
function Modal({
  isOpen,
  onRequestClose,
  title,
  style,
  children,
  removeCross,
  confetti,
  customConfetti,
}: ModalProps) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  console.log(typeof title);
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 11,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      overflow: "auto",
      border: "5px solid black",
      borderRadius: "10px",
      padding: "0",
      inset: "auto",
      maxHeight: "90vh",
      maxWidth: "90vw",
    },
    ...style,
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <>
        <TitleContainer>
          {title ? (
            typeof title === "string" ? (
              <Title>{title}</Title>
            ) : (
              { title }
            )
          ) : (
            <div></div>
          )}
          {!removeCross && (
            <Button
              fontSize="14px"
              color={theme.primaryDark}
              backgroundColor={theme.primaryLight}
              onClick={onRequestClose}
              padding="5px 10px"
            >
              x
            </Button>
          )}
        </TitleContainer>
        {children}
      </>
      {confetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          drawShape={customConfetti && customConfetti}
        />
      )}
    </ReactModal>
  );
}

export default Modal;
