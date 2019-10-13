import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import CloseButton from "./CloseButton";
import styles from './modal.module.css';

const Modal = ({children, onClose, zIndex = 999, visible = false}) => (
  <>
    {
      visible && <Window zIndex={zIndex} onClose={onClose}>{children}</Window>
    }
  </>
);

const Window = ({children, zIndex, onClose}) => {
  const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const listener = event => {
      if (event.keyCode === 27)
        onClose();
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const closeByCoverClick = event => {
    const targetId = event.target.id;
    if (targetId === `modalCover${id}` || targetId === `modalContent${id}`)
      onClose();
  };

  return createPortal(
    <aside style={{zIndex}} className={styles.modalCover} id={`modalCover${id}`} onClick={closeByCoverClick}>
      <CloseButton closeModal={onClose}/>
      <div className={styles.modalContent} id={`modalContent${id}`}>
        {children}
      </div>
    </aside>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number
};

export default Modal;
