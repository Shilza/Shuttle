import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import CloseButton from "./CloseButton";
import styles from './modal.module.css';

const Modal = ({children, closeModal}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const listener = event => {
      if (event.keyCode === 27)
        closeModal();
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const closeByCoverClick = event => {
    if (event.target.id === 'modalCover')
      closeModal();
  };

  return createPortal(
    <aside className={styles.modalCover} id='modalCover' onClick={closeByCoverClick}>
      <CloseButton closeModal={closeModal}/>
      <div className={styles.modalContent}>
        {children}
      </div>
    </aside>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
