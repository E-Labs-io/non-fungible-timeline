/** @format */
import React from "react";
import styled from "styled-components";

import { Loader } from "../../../../components/common";

const NoticeContainer = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
`;

interface LoadingNoticeProps {
  loadingState: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const LoadingNotice = ({ loadingState }: LoadingNoticeProps) => {
  return (
    <NoticeContainer>
      {loadingState > 1 && <Loader />}
      {loadingState === 1 && <h3>Stalking the wallet</h3>}
      {loadingState === 2 && <h3>Tracking all of it's rugs</h3>}
      {loadingState === 3 && <h3>Finding all of it's mistakes</h3>}
      {loadingState === 4 && <h3>Counting all the wins (on one hand)</h3>}
      {loadingState === 5 && (
        <h3>Found, sorted and laughed over, here's the timeline...</h3>
      )}
      {loadingState === 6 && null}
    </NoticeContainer>
  );
};

export default LoadingNotice;
