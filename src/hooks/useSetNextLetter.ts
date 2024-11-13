import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import useOverallStats from './useOverallStats';

const getAllLetterCorrectness = (word: string, guess: string) => {
  const result = Array(word.length).fill('x');
  const wordArr = word.split('');
  const guessArr = guess.split('');

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = 'y';
      guessArr[i] = '';
      wordArr[i] = '';
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (guessArr[i] !== '' && wordArr.includes(guessArr[i])) {
      result[i] = 'n';
      wordArr[wordArr.indexOf(guessArr[i])] = ''; // Mark as used
    }
  }

  return result.join('');
};

const useSetNextLetter = () => {
  const {
    setCurrentGuessString,
    currentGuessString,
    guessNumber,
    todaysWord,
    setGuessNumber,
    submittedGuesses,
    setSubmittedGuesses,
    puzzleCompleted,
    setPuzzleCompleted,
    setIsStatsModalOpen,
    setActiveDate,
    setLastSuccessfulDate,
  } = useContext(AppContext);
  const {
    incrementGamesWon,
    incrementGamesCompleted,
    incrementWinStreak,
    setStat,
    incrementOverallStats,
  } = useOverallStats();

  const handleClickEnter = useCallback(() => {
    if (currentGuessString.length !== 5 || !todaysWord) return;

    const isGuessCorrect = todaysWord.toLowerCase() === currentGuessString.toLowerCase();
    const letterGuesses = getAllLetterCorrectness(todaysWord, currentGuessString);

    const newSubmittedGuesses = {
      ...submittedGuesses,
      [guessNumber]: [
        [currentGuessString[0], letterGuesses[0]],
        [currentGuessString[1], letterGuesses[1]],
        [currentGuessString[2], letterGuesses[2]],
        [currentGuessString[3], letterGuesses[3]],
        [currentGuessString[4], letterGuesses[4]],
      ],
    };

    setSubmittedGuesses(newSubmittedGuesses);

    const formattedDate = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    )
      .toISOString()
      .substring(0, 19)
      .split('T')[0];
    setActiveDate(formattedDate);

    if (isGuessCorrect || guessNumber === 5) {
      if (isGuessCorrect) {
        incrementGamesWon();
        incrementWinStreak();
        incrementOverallStats(guessNumber + 1);
        setLastSuccessfulDate(formattedDate);
      } else {
        if (!isGuessCorrect) {
          setStat('winStreak', '0');
        }
      }
      incrementGamesCompleted();
      setTimeout(() => setPuzzleCompleted(true), 2000);
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, 4000);
    } else if (guessNumber <= 5) {
      setCurrentGuessString('');
      setTimeout(() => setGuessNumber(guessNumber + 1), 700);
    }
  }, [
    currentGuessString,
    guessNumber,
    setCurrentGuessString,
    setGuessNumber,
    setIsStatsModalOpen,
    setPuzzleCompleted,
    setSubmittedGuesses,
    submittedGuesses,
    todaysWord,
    setActiveDate,
    incrementGamesCompleted,
    incrementGamesWon,
    incrementWinStreak,
    setStat,
    incrementOverallStats,
    setLastSuccessfulDate,
  ]);

  const handleClickBackspace = useCallback(() => {
    if (currentGuessString.length > 0)
      setCurrentGuessString(currentGuessString.slice(0, currentGuessString.length - 1));
  }, [currentGuessString, setCurrentGuessString]);

  const onClickKeyboard = useCallback(
    (key: string) => {
      if (puzzleCompleted) return;
      if (key.toLowerCase() === 'enter') {
        handleClickEnter();
      } else if (key.toLowerCase() === 'backspace') {
        handleClickBackspace();
      } else {
        if (currentGuessString.length < 5) {
          setCurrentGuessString(currentGuessString.concat(key));
        }
      }
    },
    [
      setCurrentGuessString,
      currentGuessString,
      handleClickEnter,
      handleClickBackspace,
      puzzleCompleted,
    ],
  );

  return {
    onClickKeyboard,
  };
};

export default useSetNextLetter;
