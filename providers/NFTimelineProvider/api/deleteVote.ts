/** @format */

export async function deleteVote(
  ballotId: string,
  voter: string,
  votedFor: string
): Promise<boolean> {
  const body = JSON.stringify({ ballotId, voter, votedFor });
  const postResult = await fetch(
    `${process.env.NEXT_PUBLIC_NFT_SERVER}/deleteVote`,
    {
      method: "DELETE",
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
      console.log("got return data", res);
      if (res.status === 200) return true;
      else return false;
    })
    .catch((error) => {
      console.log("error deleting vote", error);
      return false;
    });

  return postResult;
}
