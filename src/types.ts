export type SubmittedGuessesType = Record<number, Array<Array<string>> | null>;

type GuessAmounts = 1 | 2 | 3 | 4 | 5 | 6;

export type DailyStatsType = {
  overallStats: Record<GuessAmounts, number>;
  gamesCompleted: number;
  gamesWon: number;
  winStreak: number;
  bestWinStreak: number;
};
