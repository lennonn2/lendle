import React, { useEffect, useState } from 'react';
import { WORDS_LIST } from '../words';
import { usePersistedState } from '../hooks/usePersistedState';
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
  const [activeDate, setActiveDate] = usePersistedState<string | null>(
    null,
    'activeDate',
  );
  const [guessNumber, setGuessNumber] = usePersistedState<number>(0, 'guessNumber');
  const [puzzleCompleted, setPuzzleCompleted] = usePersistedState<boolean>(
    false,
    'puzzleCompleted',
  );
  const [submittedGuesses, setSubmittedGuesses] = usePersistedState<SubmittedGuessesType>(
    {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
    },
    'submittedGuesses',
  );
  const [currentGuessString, setCurrentGuessString] = useState('');
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
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

  useEffect(() => {
    const today = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    )
      .toISOString()
      .substring(0, 19)
      .split('T')[0];
    if (today !== activeDate) {
      setActiveDate(null);
      setSubmittedGuesses({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
      });
      setPuzzleCompleted(false);
      setGuessNumber(0);
    }
  }, []);

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
    isStatsModalOpen,
    setIsStatsModalOpen,
    activeDate,
    setActiveDate,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
