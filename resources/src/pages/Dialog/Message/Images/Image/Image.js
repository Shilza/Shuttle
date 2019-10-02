import React, {useState} from "react";

import {createPortal} from 'react-dom';

import styles from "./image.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({src, ...props}) => {
  const [isFull, setIsFull] = useState(false);

  const openImage = () => {
    setIsFull(true);
  };

  const closeImage = () => {
    setIsFull(false);
  };

  return (
    <>
      {
        isFull &&
        <FullScreen onClose={closeImage}>
          <img src={src} className={styles.imgFull} alt=''/>
        </FullScreen>
      }
      <LazyLoadImage
        src={src}
        alt={'Media'}
        effect="blur"
        onClick={openImage}
        wrapperClassName={styles.img}
        {...props}
      />
    </>
  )
};

const appRoot = document.getElementById('root');

const FullScreen = ({children, onClose, ...props}) => (
  createPortal(
    <div className={styles.fullscreen} onClick={onClose} {...props}>
      {children}
    </div>,
    appRoot
  )
);

export default Image;
