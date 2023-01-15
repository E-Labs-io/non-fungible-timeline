/** @format */

import styled from "styled-components";
import React, { FC, useState, useEffect, useRef } from "react";
import { ExtraStyleProps } from "types/genericTypes";

const TextArea = styled.textarea<ExtraStyleProps>`
  width: ${({ width }) => width || "100%"};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "18px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "normal")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  overflow: hidden;
  resize: none;
  border-width: ${({ hiddenBorder }) => (hiddenBorder ? "0" : "2px")};
  border-radius: 4px;
  padding: ${({ padding }) => (padding ? padding : "8px")};
  background-color: transparent;
`;

const TextInput = styled.input<ExtraStyleProps>`
  width: ${({ width }) => width || "100%"};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "18px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "normal")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  overflow: hidden;
  resize: none;
  border-width: ${({ hiddenBorder }) => (hiddenBorder ? "0" : "2px")};
  border-radius: 4px;
  padding: ${({ padding }) => (padding ? padding : "8px")};
  background-color: transparent;
`;

interface TextFieldProps {
  width?: string;
  style?: React.CSSProperties;
  onChange: (text: string) => void;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  color?: string;
  minHeight?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
  maxChar?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  hiddenBorder?: boolean;
  type?: string;
  padding?: string;
  selectOnFocus?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (event: any) => void;
}

const TextField: FC<TextFieldProps> = ({
  width,
  style,
  onChange,
  fontSize,
  fontWeight,
  textAlign,
  color,
  minHeight,
  disabled = false,
  value = "",
  placeholder,
  multiline = false,
  maxChar,
  onFocus,
  onBlur,
  hiddenBorder = false,
  type = "text",
  padding,
  selectOnFocus = false,
  autoFocus,
  onKeyDown,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  useEffect(() => {
    textAreaRef &&
      textAreaRef.current &&
      setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [value]);

  const handleOnFocus = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onFocus) onFocus();
    if (selectOnFocus) {
      event.target.select();
    }
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setTextAreaHeight("auto");
    onChange(text);
  };

  const onTextInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    onChange(text);
  };

  return (
    <>
      {multiline ? (
        <TextArea
          width={width}
          autoFocus={autoFocus}
          style={style}
          ref={textAreaRef}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}
          color={color}
          height={textAreaHeight}
          minHeight={minHeight}
          onChange={onTextAreaChange}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          maxLength={maxChar}
          onFocus={handleOnFocus}
          onBlur={onBlur}
          hiddenBorder={hiddenBorder}
          type={type}
          padding={padding}
          onKeyDown={onKeyDown}
        />
      ) : (
        <TextInput
          width={width}
          autoFocus={autoFocus}
          ref={textInputRef}
          style={style}
          onChange={onTextInputChange}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}
          color={color}
          disabled={disabled}
          value={value}
          placeholder={value ?? placeholder}
          maxLength={maxChar}
          onFocus={handleOnFocus}
          onBlur={onBlur}
          hiddenBorder={hiddenBorder}
          type={type}
          padding={padding}
          onKeyDown={onKeyDown}
        />
      )}
    </>
  );
};

export default TextField;
