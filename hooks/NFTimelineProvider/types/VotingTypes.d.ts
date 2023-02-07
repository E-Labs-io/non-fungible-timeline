/** @format */

export type BallotIndex = {
  [category: string]: Ballot;
};

export type Ballot = {
  ballotId: number;
  title: string;
  active: boolean;
  votes: Votes[];
};

export type Votes = {
  voteId?: string;
  voter: string;
  votedFor: string;
  timestamp: Date;
};

export type WalletsVotes = { [ballotId: string]: Votes[] };
