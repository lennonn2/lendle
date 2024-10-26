import styles from './Stats.module.css';

const mockStatsObj = {
  1: 0,
  2: 3,
  3: 9,
  4: 8,
  5: 7,
  6: 3,
};

const Stats = () => {
  const largestNumber = Object.values(mockStatsObj).sort((a, b) => b - a)[0];
  const count = new Array(6);
  return (
    <div className={styles.wrapper}>
      <div className={styles.yAxis}>
        {Array.from(count).map((_, i) => {
          return (
            <div className={styles.yKey} key={i + 1}>
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className={styles.main}>
        {Object.entries(mockStatsObj).map(([number, value]) => {
          const width = `${Math.round((value / largestNumber) * 100)}%`;
          return (
            <div style={{ width }} className={styles.bar} key={number}>
              {value > 0 ? <span className={styles.barNumber}>{value}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
