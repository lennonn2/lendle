import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Modal from '../Modal';

import styles from './StatsModal.module.css';
import Stats from '../Stats/Stats';

const CloseIcon = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      data-testid="icon-close"
      fill="currentColor"
    >
      <path
        fill="var(--color-tone-1)"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      ></path>
    </svg>
  );
};

const StatsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { puzzleCompleted, guessNumber, submittedGuesses } = useContext(AppContext);
  const unsuccessfulPuzzle = guessNumber === 4 && submittedGuesses[4];
  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    if (puzzleCompleted || unsuccessfulPuzzle) {
      setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    }
  }, [puzzleCompleted, unsuccessfulPuzzle]);
  return isOpen ? (
    <Modal>
      <div className={styles.main}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <h2>{puzzleCompleted ? 'Congrats!' : 'Unlucky this time!'}</h2>
        {puzzleCompleted ? (
          <p>
            You got today's Lendle in {guessNumber + 1}{' '}
            {guessNumber + 1 > 1 ? 'guesses' : 'guess'}
          </p>
        ) : null}
        {/* <div className={styles.stats}>stats will go here</div> */}
        <Stats />
      </div>
    </Modal>
  ) : null;
};

export default StatsModal;
