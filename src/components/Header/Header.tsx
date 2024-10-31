import { useCallback, useContext } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppContext';
import styles from './Header.module.css';

const StatsIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="4 4 24 24"
      width="28"
      data-testid="icon-stats"
      fill="currentColor"
      className={className}
    >
      <path
        fill="var(--color-tone-1)"
        d="M21.3332 14.6667V4H10.6665V12H2.6665V28H29.3332V14.6667H21.3332ZM13.3332 6.66667H18.6665V25.3333H13.3332V6.66667ZM5.33317 14.6667H10.6665V25.3333H5.33317V14.6667ZM26.6665 25.3333H21.3332V17.3333H26.6665V25.3333Z"
      ></path>
    </svg>
  );
};

const HamburgerIcon = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="32"
      viewBox="-4 -4 32 32"
      width="32"
      data-testid="icon-menu"
      fill="currentColor"
    >
      <path
        fill="var(--color-tone-1)"
        d="M3.93428 18.2929C3.61506 18.2929 3.34567 18.1831 3.1261 17.9636C2.90654 17.744 2.79675 17.4746 2.79675 17.1554C2.79675 16.8362 2.90654 16.5668 3.1261 16.3473C3.34567 16.1277 3.61506 16.0179 3.93428 16.0179H20.0658C20.385 16.0179 20.6544 16.1277 20.874 16.3473C21.0935 16.5668 21.2033 16.8362 21.2033 17.1554C21.2033 17.4746 21.0935 17.744 20.874 17.9636C20.6544 18.1831 20.385 18.2929 20.0658 18.2929H3.93428ZM3.93428 13.1375C3.61506 13.1375 3.34567 13.0277 3.1261 12.8081C2.90654 12.5886 2.79675 12.3192 2.79675 12C2.79675 11.6808 2.90654 11.4114 3.1261 11.1918C3.34567 10.9723 3.61506 10.8625 3.93428 10.8625H20.0658C20.385 10.8625 20.6544 10.9723 20.874 11.1918C21.0935 11.4114 21.2033 11.6808 21.2033 12C21.2033 12.3192 21.0935 12.5886 20.874 12.8081C20.6544 13.0277 20.385 13.1375 20.0658 13.1375H3.93428ZM3.93428 7.98206C3.61506 7.98206 3.34567 7.87227 3.1261 7.65271C2.90654 7.43314 2.79675 7.16375 2.79675 6.84453C2.79675 6.52533 2.90654 6.25595 3.1261 6.03638C3.34567 5.81681 3.61506 5.70703 3.93428 5.70703H20.0658C20.385 5.70703 20.6544 5.81681 20.874 6.03638C21.0935 6.25595 21.2033 6.52533 21.2033 6.84453C21.2033 7.16375 21.0935 7.43314 20.874 7.65271C20.6544 7.87227 20.385 7.98206 20.0658 7.98206H3.93428Z"
      ></path>
    </svg>
  );
};

const Header = () => {
  const { setIsStatsModalOpen } = useContext(AppContext);
  const handleClickStats = useCallback(
    () => setIsStatsModalOpen(true),
    [setIsStatsModalOpen],
  );
  return (
    <header className={styles.main}>
      <button className={clsx(styles.iconButton, styles.hamburgerMenu)}>
        <HamburgerIcon />
      </button>
      <h1>
        <span style={{ color: 'green' }}>Le</span>nd
        <span style={{ color: 'orange' }}>le</span>
      </h1>
      <button className={styles.iconButton} onClick={handleClickStats}>
        <StatsIcon />
      </button>
    </header>
  );
};

export default Header;
