import React, {useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import FullScreen from "./FullScreen";

import styles from "./image.module.css";

const Image = ({src, ...props}) => {
  const [isFull, setIsFull] = useState(false);

  const openImage = (event) => {
    event.stopPropagation();
    setIsFull(true);
  };

  const closeImage = (event) => {
    event && event.stopPropagation();
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


export default Image;
