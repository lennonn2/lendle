import { useCallback } from 'react';
import { DailyStatsType } from '../types';

const useOverallStats = () => {
  const getStat = useCallback((key: keyof DailyStatsType) => {
    const obj = JSON.parse(localStorage.getItem('lendle-stats') ?? '{}');
    return obj?.[key] ?? null;
  }, []);

  const setStat = useCallback((key: keyof DailyStatsType, value: string) => {
    const stats = JSON.parse(localStorage.getItem('lendle-stats') ?? '{}');
    localStorage.setItem(
      'lendle-stats',
      JSON.stringify({
        ...stats,
        [key]: value,
      }),
    );
  }, []);

  const incrementGamesCompleted = useCallback(() => {
    const gamesCompleted = getStat('gamesCompleted') ?? 0;
    setStat('gamesCompleted', gamesCompleted + 1);
  }, [getStat, setStat]);

  const incrementGamesWon = useCallback(() => {
    const gamesWon = getStat('gamesWon') ?? 0;
    setStat('gamesWon', gamesWon + 1);
  }, [getStat, setStat]);

  const incrementWinStreak = useCallback(() => {
    const winStreak = getStat('winStreak') ?? 0;
    setStat('winStreak', winStreak + 1);
    const bestWinStreak = getStat('bestWinStreak') ?? 0;
    if (winStreak + 1 > bestWinStreak) {
      setStat('bestWinStreak', winStreak + 1);
    }
  }, [getStat, setStat]);

  const incrementOverallStats = useCallback(
    (number: number) => {
      const overallStats = JSON.parse(getStat('overallStats'));
      if (!overallStats) {
        setStat(
          'overallStats',
          JSON.stringify({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            [number]: 1,
          }),
        );
      } else {
        setStat(
          'overallStats',
          JSON.stringify({
            ...overallStats,
            [number]: overallStats[number] + 1,
          }),
        );
      }
    },
    [getStat, setStat],
  );

  return {
    setStat,
    getStat,
    incrementGamesCompleted,
    incrementGamesWon,
    incrementWinStreak,
    incrementOverallStats,
  };
};

export default useOverallStats;
