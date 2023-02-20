/** @format */

import { ApiError } from "types/genericTypes";
import { AllBallotRankingData } from "../types/RankingTypes";

export const getAllRankingData = async (): Promise<
  AllBallotRankingData | ApiError
> =>
  fetch(`${process.env.NEXT_PUBLIC_NFT_SERVER}/getAllBallotRanking`).then(
    (res: Response) => {
      if (res.status === 200) return res.json().then((json) => json);
      else
        return res.text().then((message) => new ApiError(res.status, message));
    }
  );


  