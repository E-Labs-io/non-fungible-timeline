/** @format */

import { ApiError } from "types/genericTypes";

export const getUsersSpyList = async (
  usersAddress: string
): Promise<any | ApiError> =>
  fetch(
    `${process.env.NEXT_PUBLIC_NFT_SERVER}/getSpyList/${usersAddress}`
  ).then((res: Response) => {
    return res.json().then((json) => {
      if (res.status === 200) return json;
      else
        return res.text().then((message) => new ApiError(res.status, message));
    });
  });

export async function addNewSpy(
  usersAddress: string,
  spyAddress: string
): Promise<boolean> {
  const body = JSON.stringify({ usersAddress, spyAddress });
  const postResult = await fetch(
    `${process.env.NEXT_PUBLIC_NFT_SERVER}/addSpyAddress`,
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
      console.log("got return data", res);
      if (res.status === 200) return true;
      else return false;
    })
    .catch((error) => {
      console.log("error posting SpyAddress", error);
      return false;
    });

  return postResult;
}

export async function deleteFromSpyList(
  usersAddress: string,
  spyAddress: string
): Promise<boolean> {
  const body = JSON.stringify({ usersAddress, spyAddress });
  const postResult = await fetch(
    `${process.env.NEXT_PUBLIC_NFT_SERVER}/deleteSpyAddress`,
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
      console.log("error deleting SpyAddress", error);
      return false;
    });

  return postResult;
}
