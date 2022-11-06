/** @format */

import { Loader } from "components/common";

interface LoadingNoticeProps {
  loadingState: 0 | 1 | 2 | 3 | 4;
}

const LoadingNotice = ({ loadingState }) => {
  console.log("Loading State Changed: ", loadingState);
  return (
    <>
      {loadingState > 1 && <Loader />}
      {loadingState === 1 && <h3>Stalking your NFT history</h3>}
      {loadingState === 2 && <h3>Tracking all your rugs</h3>}
      {loadingState === 3 && <h3>Finding all your mistakes</h3>}
      {loadingState === 4 && <h3>Counting all your wins (on one hand)</h3>}
    </>
  );
};

export default LoadingNotice;
