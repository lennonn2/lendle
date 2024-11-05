import type { SubmittedGuessesType } from './types';

export const generateShareString = (
  guesses: SubmittedGuessesType,
  activeDate: string | null,
) => {
  const stringArr = Object.values(guesses)
    .filter(Boolean)
    .map((arr) => {
      return arr?.reduce((string, subArr) => {
        if (subArr[1] === 'n') string = string.concat('🟨');
        if (subArr[1] === 'y') string = string.concat('🟩');
        if (subArr[1] === 'x') string = string.concat('⬛️');
        return string;
      }, '');
    });
  const numberOfGuesses = Object.values(guesses).filter(Boolean).length;
  return [
    `Lendle ${activeDate ?? ''}`,
    `${numberOfGuesses}/6`,
    `${stringArr.join('\n')}`,
  ].join('\n');
};
