import { useContext, useMemo, memo } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppContext';
import useSetNextLetter from '../../hooks/useSetNextLetter';
import type { SubmittedGuessesType } from '../../types';

import styles from './Keyboard.module.css';

type PropsType = {
  letters: Array<string>;
  addSpacers?: boolean;
};

const getActiveKeyColours = (guesses: SubmittedGuessesType) => {
  return Object.values(guesses)
    .filter(Boolean)
    .reduce<{
      greens: Set<string>;
      yellows: Set<string>;
      greys: Set<string>;
    }>(
      (acc, guessArray) => {
        guessArray?.forEach(([letter, guess]) => {
          if (guess === 'y') {
            acc.greens.add(letter);
            acc.yellows.delete(letter);
          }
          if (guess === 'n') {
            acc.yellows.add(letter);
          }
          if (guess === 'x') {
            acc.greys.add(letter);
          }
        });
        return acc;
      },
      { greens: new Set<string>(), yellows: new Set<string>(), greys: new Set<string>() },
    );
};

const BackspaceIcon = () => (
  <svg
    fill="currentColor"
    height="14px"
    width="14px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44.18 44.18"
  >
    <g>
      <path
        d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z"
        strokeWidth={3}
      />
      <polygon
        points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676 
 18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 	"
      />
    </g>
  </svg>
);

const KeyboardRow = ({ letters, addSpacers = false }: PropsType) => {
  const { submittedGuesses } = useContext(AppContext);
  const { onClickKeyboard } = useSetNextLetter();
  const { greens, yellows, greys } = useMemo(
    () => getActiveKeyColours(submittedGuesses),
    [submittedGuesses],
  );

  return (
    <div className={styles.keyboardRow}>
      {addSpacers ? <div className={styles.spacer} /> : null}
      {letters.map((letter) => (
        <button
          key={letter}
          className={clsx(styles.key, {
            [styles.keyGreen]: greens.has(letter),
            [styles.keyYellow]: yellows.has(letter),
            [styles.keyGrey]: greys.has(letter),
          })}
          onClick={() => onClickKeyboard(letter)}
        >
          {letter === 'Backspace' ? <BackspaceIcon /> : letter.toUpperCase()}
        </button>
      ))}
      {addSpacers ? <div className={styles.spacer} /> : null}
    </div>
  );
};

export default memo(KeyboardRow);
