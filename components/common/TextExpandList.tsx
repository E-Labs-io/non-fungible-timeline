/** @format */

import React, { Fragment } from "react";
import styled, { useTheme } from "styled-components";

import TextExpand from "./TextExpand";
import { device } from "constants/media";

const Wrapper = styled.dl`
  width: 100%;
  max-width: 70vw;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: left;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  border-radius: 20px;
  padding: 20px;
  row-gap: 20px;

  @media ${device.tablet} {
    max-width: 80vw;
  }

  @media ${device.mobileL} {
    max-width: 90vw;
  }
`;

interface TextExpandListProps {
  data: { title: string; content?: string }[];
}

function TextExpandList({ data }: TextExpandListProps) {
  const theme = useTheme();
  const dataLength = data && data.length;
  return (
    <Wrapper>
      {data.length
        ? data.map((item, index) => (
            <Fragment key={index}>
              <TextExpand title={item.title} content={item?.content} />
            </Fragment>
          ))
        : null}
    </Wrapper>
  );
}

export default TextExpandList;
