import { useEffect } from 'react';
import useSetNextLetter from '../../hooks/useSetNextLetter';
import KeyboardRow from './KeyboardRow';
import { topRow, middleRow, bottomRow } from './constants';

import styles from './Keyboard.module.css';

const Keyboard = () => {
  const { onClickKeyboard } = useSetNextLetter();
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (
        (e.code !== `Key${e.key.toUpperCase()}` &&
          e.code !== 'Backspace' &&
          e.code !== 'Enter') ||
        e.metaKey
      )
        return;
      onClickKeyboard(e.key);
    };
    document.addEventListener('keydown', keyboardHandler);
    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, [onClickKeyboard]);
  return (
    <div className={styles.main}>
      <KeyboardRow letters={topRow} />
      <KeyboardRow letters={middleRow} addSpacers />
      <KeyboardRow letters={bottomRow} />
    </div>
  );
};

export default Keyboard;
