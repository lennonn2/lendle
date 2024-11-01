import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import useOverallStats from './useOverallStats';

const getLetterCorrectness = (word: string, guess: string, index: number) => {
  if (!word.includes(guess)) return 'x';
  if (word[index] === guess) return 'y';
  return 'n';
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

    const newSubmittedGuesses = {
      ...submittedGuesses,
      [guessNumber]: [
        [
          currentGuessString[0],
          getLetterCorrectness(todaysWord, currentGuessString[0], 0),
        ],
        [
          currentGuessString[1],
          getLetterCorrectness(todaysWord, currentGuessString[1], 1),
        ],
        [
          currentGuessString[2],
          getLetterCorrectness(todaysWord, currentGuessString[2], 2),
        ],
        [
          currentGuessString[3],
          getLetterCorrectness(todaysWord, currentGuessString[3], 3),
        ],
        [
          currentGuessString[4],
          getLetterCorrectness(todaysWord, currentGuessString[4], 4),
        ],
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

    setCurrentGuessString('');
    if (isGuessCorrect || guessNumber === 5) {
      if (isGuessCorrect) {
        incrementGamesWon();
        incrementWinStreak();
        incrementOverallStats(guessNumber + 1);
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
