import { createContext } from 'react';
import type { SubmittedGuessesType } from '../types';

const defaultState = {
  guessNumber: 0,
  setGuessNumber: () => {},
  todaysWord: 'Lenny',
  currentGuessString: '',
  setCurrentGuessString: () => {},
  submittedGuesses: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  },
  setSubmittedGuesses: () => {},
  puzzleCompleted: false,
  setPuzzleCompleted: () => {},
};

export type AppState = {
  guessNumber: number;
  setGuessNumber: (num: number) => void;
  todaysWord: string | null;
  currentGuessString: string;
  setCurrentGuessString: (guess: string) => void;
  submittedGuesses: SubmittedGuessesType;
  setSubmittedGuesses: (guesses: SubmittedGuessesType) => void;
  puzzleCompleted: boolean;
  setPuzzleCompleted: (isComplete: boolean) => void;
};

export const AppContext = createContext<AppState>(defaultState);
