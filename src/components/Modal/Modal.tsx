import React from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

type PropsType = {
  children: React.ReactNode;
};

const Modal = ({ children }: PropsType) => {
  return createPortal(<div className={styles.main}>{children}</div>, document.body);
};

export default Modal;
