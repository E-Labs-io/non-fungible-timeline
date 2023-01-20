/** @format */

export type Ballot = {
  ballotId: number;
  title: string;
  active: boolean;
  votes: Votes[];
};

export type Votes = {
  voteId: number;
  voter: string;
  votedFor: string;
  timestamp: Date;
  ballotBallotId: number;
  ballot: Ballot;
};
