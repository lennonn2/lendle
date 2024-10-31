import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

const getIsActiveDateToday = () => {
  const activeDate = window.localStorage.getItem('activeDate');
  const activeDateString = activeDate ? JSON.parse(activeDate) : '';
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
  )
    .toISOString()
    .substring(0, 19)
    .split('T')[0];
  return activeDateString === today;
};

function usePersistedState<T>(defaultValue: T, key: string): PersistedState<T> {
  const [value, setValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);

    const isActiveDateToday = getIsActiveDateToday();
    return value && isActiveDateToday ? (JSON.parse(value) as T) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { usePersistedState };
