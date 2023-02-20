/** @format */

import { Votes } from "../types";

const postVote = async (ballotId: string, voteData: Votes): Promise<number> => {
  const body = JSON.stringify({
    voteData,
    ballotId,
  });
  const postResult = await fetch(
    `${process.env.NEXT_PUBLIC_NFT_SERVER}/newVote`,
    {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_NFTIMELINE_API,
      },
      body: body,
      cache: "default",
    }
  )
    .then((res: Response) => {
      if (res.status === 200) return 5;
      if (res.status === 409) return 4;
      else return 3;
    })
    .then((state: number) => {
      console.log("Check return from API POST: State ", state);
      return state;
    })
    .catch((error) => {
      console.log(error);
      return 3;
    });

  return postResult;
};

export default postVote;
