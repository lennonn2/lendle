import { useCallback, useMemo } from 'react';
import { DailyStatsType } from '../types';

const useOverallStats = () => {
  const existingStats = localStorage.getItem('lendle-stats');
  const stats = useMemo(() => JSON.parse(existingStats) ?? {}, [existingStats]);

  const getStat = useCallback((key: keyof DailyStatsType) => {
    const obj = JSON.parse(localStorage.getItem('lendle-stats'));
    return obj?.[key] ?? null;
  }, []);

  const setStat = useCallback(
    (key: keyof DailyStatsType, value: string) => {
      localStorage.setItem(
        'lendle-stats',
        JSON.stringify({
          ...stats,
          [key]: value,
        }),
      );
    },
    [stats],
  );

  const incrementGamesCompleted = useCallback(() => {
    const gamesCompleted = getStat('gamesCompleted');
    setStat('gamesCompleted', `${gamesCompleted ?? 0 + 1}`);
  }, [getStat, setStat]);

  const incrementGamesWon = useCallback(() => {
    const gamesWon = getStat('gamesWon');
    setStat('gamesWon', `${gamesWon ?? 0 + 1}`);
  }, [getStat, setStat]);

  const incrementWinStreak = useCallback(() => {
    const winStreak = getStat('winStreak');
    setStat('winStreak', `${winStreak ?? 0 + 1}`);
    const bestWinStreak = getStat('bestWinStreak');
    if (winStreak + 1 > bestWinStreak) {
      setStat('bestWinStreak', winStreak);
    }
  }, [getStat, setStat]);

  const incrementOverallStats = useCallback(
    (number: number) => {
      const overallStats = getStat('overallStats');
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
