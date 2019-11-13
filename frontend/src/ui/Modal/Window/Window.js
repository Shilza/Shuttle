import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import CloseButton from "../CloseButton";
import styles from "./window.module.css";

const Window = ({children, zIndex, withCloseButton, onClose}) => {
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
  }, [onClose]);

  const closeByCoverClick = event => {
    const targetId = event.target.id;
    if (targetId === `modalCover${id}` || targetId === `modalContent${id}`)
      onClose();
  };

  return createPortal(
    <aside style={{zIndex}} className={styles.modalCover} id={`modalCover${id}`} onClick={closeByCoverClick}>
      { withCloseButton && <CloseButton closeModal={onClose} zIndex={zIndex + 1}/> }
      <div className={styles.modalContent} id={`modalContent${id}`}>
        {children}
      </div>
    </aside>,
    document.body
  );
};

export default Window;
