import React, { useEffect, useState } from 'react';
import { WORDS_LIST } from '../words';
import type { SubmittedGuessesType } from '../types';

import { AppContext } from './AppContext';

const mockApiCall = () => {
  return new Promise((resolve) => {
    const formattedDate = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    )
      .toISOString()
      .substring(0, 19)
      .split('T')[0];
    setTimeout(() => {
      resolve(WORDS_LIST[formattedDate] ?? 'lenny');
    }, 350);
  });
};

const fetchTodaysWord = async () => {
  const word = await mockApiCall();
  return word;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [guessNumber, setGuessNumber] = useState(0);
  const [currentGuessString, setCurrentGuessString] = useState('');
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [submittedGuesses, setSubmittedGuesses] = useState<SubmittedGuessesType>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [todaysWord, setTodaysWord] = useState<string | null>(null);

  useEffect(() => {
    const getWord = async () => {
      if (todaysWord === null) {
        const res = (await fetchTodaysWord()) as string;
        setTodaysWord(res);
      }
    };
    getWord();
  }, [todaysWord]);

  const contextValue = {
    guessNumber,
    setGuessNumber,
    currentGuessString,
    setCurrentGuessString,
    submittedGuesses,
    setSubmittedGuesses,
    todaysWord,
    puzzleCompleted,
    setPuzzleCompleted,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
