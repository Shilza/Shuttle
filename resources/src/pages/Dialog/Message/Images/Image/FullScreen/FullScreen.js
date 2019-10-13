import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./fullScreen.module.css";

const appRoot = document.getElementById('root');

const FullScreen = ({children, onClose, ...props}) => {
  useEffect(() => {
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

  return (
    createPortal(
      <div className={styles.container} onClick={onClose} {...props}>
        {children}
      </div>,
      appRoot
    )
  );
}

export default FullScreen;
