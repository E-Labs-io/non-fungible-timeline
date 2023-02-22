/** @format */

import {
  AllBallotRankingData,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";

const getSortedBallotRankings = (
  allRankingData: AllBallotRankingData
): AllBallotRankingData => {
  const ballotRankings: AllBallotRankingData = {};

  // For each ballot, sort the vote ranking data by vote count and keep the top numBallotsToReturn entries
  for (const [ballotId, ranks] of Object.entries(allRankingData)) {
    const sortedRankings = ranks.rankings.sort(
      (a: VoteRankData, b: VoteRankData) => b.votes - a.votes
    );

    ballotRankings[ballotId] = {
      totalVotes: ranks.totalVotes,
      totalVotedFor: ranks.totalVotedFor,
      rankings: sortedRankings,
    };
  }

  return ballotRankings;
};

export default getSortedBallotRankings;
