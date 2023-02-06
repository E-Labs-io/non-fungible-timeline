/** @format */

import { Votes } from "../types";

const postVote = async (ballotId: string, voteData: Votes) => {
  const body = JSON.stringify({
    voteData,
    ballotId,
  });
  await fetch(`${process.env.NEXT_PUBLIC_NFT_SERVER}/newIndex`, {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      apiKey: process.env.NEXT_PUBLIC_NFTIMELINE_API,
    },
    body: body,
    cache: "default",
  })
    .then((res: Response) => {
      if (typeof res === "string") return res;
      else return res.json();
    })
    .then((json) => {
      console.log("Check return from API POST: ", json);
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default postVote;
