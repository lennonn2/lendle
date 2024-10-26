import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

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
  } = useContext(AppContext);

  const onClickKeyboard = useCallback(
    (key: string) => {
      if (puzzleCompleted) return;
      if (key.toLowerCase() === 'enter') {
        if (currentGuessString.length !== 5 || !todaysWord) return;

        const isGuessCorrect =
          todaysWord.toLowerCase() === currentGuessString.toLowerCase();

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
        setCurrentGuessString('');
        if (isGuessCorrect) {
          setTimeout(() => setPuzzleCompleted(true), 2000);
        } else if (guessNumber <= 4) {
          setTimeout(() => setGuessNumber(guessNumber + 1), 700);
        }
      } else if (key.toLowerCase() === 'backspace') {
        if (currentGuessString.length > 0)
          setCurrentGuessString(
            currentGuessString.slice(0, currentGuessString.length - 1),
          );
      } else {
        if (currentGuessString.length < 5) {
          setCurrentGuessString(currentGuessString.concat(key));
        }
      }
    },
    [
      setCurrentGuessString,
      currentGuessString,
      guessNumber,
      setGuessNumber,
      setSubmittedGuesses,
      submittedGuesses,
      todaysWord,
      puzzleCompleted,
      setPuzzleCompleted,
    ],
  );

  return {
    onClickKeyboard,
  };
};

export default useSetNextLetter;
