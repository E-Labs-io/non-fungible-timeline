/** @format */

export type voteCounting = { [walletAddress: string]: VoteRankData };

export type VoteRankData = {
  walletAddress: string;
  votes: number;
  shareOfVotes?: number;
  rank?: number;
};

export type Ranks = {
  totalVotes: number;
  totalVotedFor: number;
  rankings: VoteRankData[];
};

export type AllBallotRankingData = {
  [ballotId: string]: Ranks;
};
