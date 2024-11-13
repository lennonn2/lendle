import { useContext, useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppContext';
import styles from './Guesses.module.css';

const NUMBER_OF_LETTERS = 5;
const NUMBER_OF_ROWS = 6;

const Box = ({
  index,
  isRowActive,
  currentGuess,
  submittedGuess,
  puzzleCompleted,
}: {
  index: number;
  isRowActive: boolean;
  currentGuess: string;
  submittedGuess: Array<string> | null;
  puzzleCompleted: boolean;
}) => {
  const [letter, correct] = submittedGuess ?? [];
  let boxContent = null;
  if (isRowActive) {
    boxContent = currentGuess[index];
  }
  if (submittedGuess !== null) {
    boxContent = letter;
  }
  return (
    <div
      style={{ transitionDelay: `${index * 400}ms`, animationDelay: `${index * 100}ms` }}
      className={clsx(styles.boxWrapper, {
        [styles.boxGuessed]: submittedGuess,
        [styles.boxPuzzleCompleted]: puzzleCompleted && isRowActive,
      })}
    >
      <div
        className={clsx(styles.boxFront, {
          [styles.green]: puzzleCompleted && isRowActive,
        })}
      >
        {boxContent}
      </div>
      <div
        className={clsx(styles.boxBack, {
          [styles.green]: correct === 'y',
          [styles.yellow]: correct === 'n',
        })}
      >
        {boxContent}
      </div>
    </div>
  );
};

const Row = ({
  index,
  guessNumber,
  currentGuess,
  submittedGuess,
  puzzleCompleted,
}: {
  index: number;
  guessNumber: number;
  currentGuess: string;
  submittedGuess: Array<Array<string>> | null;
  puzzleCompleted: boolean;
}) => {
  const count = new Array(NUMBER_OF_LETTERS);
  const isActive = index === guessNumber;
  return (
    <div className={styles.row}>
      {Array.from(count).map((_, i) => (
        <Box
          key={i}
          index={i}
          isRowActive={isActive}
          currentGuess={currentGuess}
          submittedGuess={submittedGuess?.[i] ?? null}
          puzzleCompleted={puzzleCompleted}
        />
      ))}
    </div>
  );
};

const Guesses = () => {
  const [showToast, setShowToast] = useState(false);
  const {
    guessNumber,
    currentGuessString,
    submittedGuesses,
    puzzleCompleted,
    todaysWord,
  } = useContext(AppContext);
  const count = new Array(NUMBER_OF_ROWS);
  const toastText = useMemo(
    () => (todaysWord === currentGuessString ? 'Well done!' : 'Unlucky'),
    [todaysWord, currentGuessString],
  );
  useEffect(() => {
    let timeoutId = null;
    if (puzzleCompleted && currentGuessString) {
      setShowToast(true);
      timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [puzzleCompleted, currentGuessString]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {Array.from(count).map((_, i) => (
          <Row
            key={i}
            index={i}
            guessNumber={guessNumber}
            submittedGuess={submittedGuesses[i]}
            currentGuess={currentGuessString}
            puzzleCompleted={puzzleCompleted && todaysWord === currentGuessString}
          />
        ))}
        {showToast ? <div className={styles.toast}>{toastText}</div> : null}
      </div>
    </div>
  );
};

export default Guesses;
