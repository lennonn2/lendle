import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.main}>
      <h1>
        <span style={{ color: 'green' }}>Le</span>nd
        <span style={{ color: 'orange' }}>le</span>
      </h1>
    </header>
  );
};

export default Header;
