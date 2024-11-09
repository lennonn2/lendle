import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Modal from '../Modal';
import { generateShareString } from '../../utils';

import styles from './StatsModal.module.css';
import Stats from '../Stats/Stats';
import Streaks from '../Streaks';

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

const LendleIcon = () => {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41.761 21.1302H41.751V21.1402H41.761V21.1302Z" fill="#7FA768" />
      <path
        d="M41.751 22.6515V58.1213H54.6218C56.5534 58.1213 58.1247 56.57 58.1247 54.6584V40.3163V22.7316L41.751 22.6515Z"
        fill="#6AAA64"
      />
      <path
        d="M57.5542 7.22854V19.719L41.771 19.649L41.8411 3.8457H54.1714C56.033 3.8457 57.5542 5.36698 57.5542 7.22854Z"
        fill="white"
      />
      <path
        d="M39.6492 40.7967V58.1013H22.5048V40.7167L39.6492 40.7967Z"
        fill="#6AAA64"
      />
      <path
        d="M39.8894 21.5405L39.7993 39.4856L21.8743 39.3855L21.9543 21.4705L39.8894 21.5405Z"
        fill="#D1B036"
      />
      <path
        d="M38.8384 3.8457L38.7684 19.629L22.9651 19.5689V3.8457H38.8384Z"
        fill="white"
      />
      <path
        d="M21.2437 40.6266V58.1913H7.41209C5.35036 58.1913 3.66895 56.5099 3.66895 54.4482V40.6266H21.2437Z"
        fill="#6AAA64"
      />
      <path d="M19.9526 22.6515L19.8725 38.4347H4.03918V22.6515H19.9526Z" fill="white" />
      <path
        d="M19.9626 3.8457V19.649H4.03918V7.22855C4.03918 5.36698 5.56046 3.8457 7.43203 3.8457H19.9626Z"
        fill="white"
      />
      <path
        d="M54.1346 1H7.39537C3.87241 1 1 3.8624 1 7.38536V54.1246C1 57.6476 3.87241 60.52 7.39537 60.52H54.1346C57.6576 60.52 60.52 57.6476 60.52 54.1246V7.38536C60.52 3.87241 57.6576 1 54.1346 1ZM41.7142 21.2971H41.7242V21.3071H41.7142V21.2971ZM4.01253 22.8183H19.9259L19.8458 38.6016H4.01253V22.8183ZM19.9259 57.5275H7.39537C5.5238 57.5275 4.00252 56.0062 4.00252 54.1346V41.5941H19.9259V57.5275ZM19.9259 19.8158H4.01253V7.38536C4.01253 5.5238 5.53381 4.00252 7.40538 4.00252H19.9359V19.8158H19.9259ZM38.7117 57.5275H22.9284V41.524L38.7117 41.6041V57.5275ZM38.6316 38.5916L22.8484 38.5115L22.9184 22.7283L38.7117 22.7883L38.6316 38.5916ZM38.7317 19.7958L22.9284 19.7357V4.00252H38.8018L38.7317 19.7958ZM57.5175 54.1346C57.5175 56.0062 55.9962 57.5275 54.1346 57.5275H41.7142V41.5941H57.5175V54.1346ZM57.5175 38.5916H41.6441L41.7142 22.8083L57.5175 22.8784V38.5916ZM57.5175 19.8859L41.7342 19.8158L41.8043 4.01253H54.1346C55.9962 4.01253 57.5175 5.53381 57.5175 7.39537V19.8859Z"
        fill="black"
      />
    </svg>
  );
};

const ShareIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18"
      height="18"
      viewBox="0 0 30 30"
      fill="currentColor"
    >
      <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
    </svg>
  );
};

const COPIED_TEXT = 'Copied!';
const COPY_TEXT = 'Copy share stats';

const StatsModal = () => {
  const {
    puzzleCompleted,
    guessNumber,
    submittedGuesses,
    isStatsModalOpen,
    setIsStatsModalOpen,
    activeDate,
    todaysWord,
    currentGuessString,
  } = useContext(AppContext);
  const [copyText, setCopyText] = useState(COPY_TEXT);
  const unsuccessfulCompletedPuzzle = guessNumber === 5 && submittedGuesses[5];
  const handleClose = () => setIsStatsModalOpen(false);
  const handleClickCopy = () => {
    const shareText = generateShareString(submittedGuesses, activeDate);
    navigator.clipboard.writeText(shareText).then(() => {
      setCopyText(COPIED_TEXT);
      setTimeout(() => {
        setCopyText(COPY_TEXT);
      }, 5000);
    });
  };
  return isStatsModalOpen ? (
    <Modal>
      <div className={styles.main}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <LendleIcon />
        <h2>Daily Lendle Stats</h2>
        {puzzleCompleted || unsuccessfulCompletedPuzzle ? (
          <>
            <h2 className={styles.heading2}>
              {puzzleCompleted && todaysWord === currentGuessString
                ? 'Congrats!'
                : 'Unlucky this time!'}
            </h2>
            {puzzleCompleted ? (
              <h4>
                You got today's Lendle in {guessNumber + 1}{' '}
                {guessNumber + 1 > 1 ? 'guesses' : 'guess'}!
              </h4>
            ) : null}
          </>
        ) : null}
        <Streaks />
        <Stats />
        {puzzleCompleted ? (
          <button className={styles.copyButton} onClick={handleClickCopy}>
            {copyText} <ShareIcon />
          </button>
        ) : null}
      </div>
    </Modal>
  ) : null;
};

export default StatsModal;
