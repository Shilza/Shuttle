import React, {useState} from "react";
import PropTypes from 'prop-types';
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import FullScreen from "./FullScreen";

import styles from "./image.module.css";

const Image = React.memo(({src, wrapperClassName, ...props}) => {
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
        wrapperClassName={wrapperClassName}
        {...props}
      />
    </>
  )
});

Image.defaultProps = {
  wrapperClassName: styles.img
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string
};

export default Image;
