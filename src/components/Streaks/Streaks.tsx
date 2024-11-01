import useOverallStats from '../../hooks/useOverallStats';
import styles from './Streaks.module.css';

type ItemPropsType = {
  number: number | string;
  subtitle: string;
};

const StreakItem = ({ number, subtitle }: ItemPropsType) => {
  return (
    <div className={styles.streakItem}>
      <div className={styles.number}>{number}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

const Streaks = () => {
  const { getStat } = useOverallStats();
  const gamesCompeleted = getStat('gamesCompleted') ?? 0;
  const gamesWon = getStat('gamesWon') ?? 0;
  const winPercentage = Number.isNaN(gamesCompeleted / gamesWon)
    ? `${0}%`
    : `${Math.round((gamesWon / gamesCompeleted) * 100)}%`;
  const winStreak = getStat('winStreak') ?? 0;
  const maxStreak = getStat('bestWinStreak') ?? 0;
  return (
    <div className={styles.main}>
      <StreakItem number={gamesCompeleted} subtitle="Played" />
      <StreakItem number={winPercentage} subtitle="Win %" />
      <StreakItem number={winStreak} subtitle="Win Streak" />
      <StreakItem number={maxStreak} subtitle="Max Streak" />
    </div>
  );
};

export default Streaks;
