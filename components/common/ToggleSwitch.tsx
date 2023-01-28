/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { Tooltip } from "react-tooltip";
const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => (width ? width : "42px")};
  height: ${({ height }) => (height ? height : "26px")};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "15px"};

  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : " #ebdcdc"};

  &:disabled {
    background: #8e1717;
  }
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${({ buttonColor }) => (buttonColor ? buttonColor : "#60a8cf")};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "15px"};
  width: ${({ width }) => (width ? width : "42px")};
  height: ${({ height }) => (height ? height : "26px")};

  &:disabled {
    background: #8e1717;
  }

  accent-color: green;

  &:checked + ${CheckBoxLabel} {
    background: ${({ selectedColor }) =>
      selectedColor ? selectedColor : "#4fbe79"};

    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

interface ToggleSwitchProps {
  backgroundColor?: string;
  selectedColor?: string;
  buttonColor?: string;
  zIndex?: string;
  borderRadius?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  tooltip?: string;
  callBack?: (status) => void;
  status?: boolean;
  id?: string;
}

function ToggleSwitch({
  backgroundColor,
  buttonColor,
  selectedColor,
  borderRadius,
  disabled,
  width,
  height,
  zIndex,
  tooltip,
  callBack,
  status,
  id,
}: ToggleSwitchProps) {
  const [active, setActive] = useState<boolean>(false);
  const [firstUse, setFirstUse] = useState<boolean>(false);

  return (
    <CheckBoxWrapper
      id={`toggleSwitch-${id}`}
      data-tooltip-content={tooltip}
      backgroundColor={backgroundColor}
      buttonColor={buttonColor}
      selectedColor={selectedColor}
      borderRadius={borderRadius}
      height={height}
      width={width}
      disabled={disabled}
      zIndex={zIndex}
      active={active}
      checked={status}
    >
      <CheckBox
        backgroundColor={backgroundColor}
        buttonColor={buttonColor}
        selectedColor={selectedColor}
        borderRadius={borderRadius}
        height={height}
        width={width}
        zIndex={zIndex}
        disabled={disabled}
        id={id ? id : "toggleSwitch"}
        type="checkbox"
        checked={status}
        control={active}
        active={active}
        onChange={() => {
          active ? setActive(false) : setActive(true);
          callBack ? callBack(active ? false : true) : null;
        }}
      />
      <CheckBoxLabel htmlFor={id} />
      {tooltip && <Tooltip anchorId="toggleSwitch" />}
    </CheckBoxWrapper>
  );
}

export default ToggleSwitch;
