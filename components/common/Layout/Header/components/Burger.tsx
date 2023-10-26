/** @format */

import React from "react";
import styled from "styled-components";
import { ExtraStyleProps } from "types/genericTypes";

const StyledBurger = styled.button<ExtraStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;

const BurgerWrapper = styled.div<ExtraStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 10;
  color: white;
  span {
    width: 32px;
    height: 4px;
    background: ${({ theme, open }) =>
      open ? theme.singleTheme.color : theme.singleTheme.color};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      color: white;
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) =>
        open ? "translateX(-20px)" : "translateX(0)"};
      color: white;
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      color: white;
    }
  }
`;

interface BurgerProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

function Burger({ open, setOpen, ...props }: BurgerProps) {
  const isExpanded = open ? true : false;

  return (
    <StyledBurger
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      open={open}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <BurgerWrapper open={open}>
        <span />
        <span />
        <span />
      </BurgerWrapper>
    </StyledBurger>
  );
}

export default Burger;
