import React from "react";
import PropTypes from 'prop-types';

import styles from './post.module.css';

const Media = React.memo(({src}) =>
  <>
    {
      src.match('.mp4') ?
        <video src={src} className={styles.media}/> :
        <img
          alt="user's post"
          src={src}
          className={styles.media}
        />
    }
  </>
);

Media.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.string
};

export default Media;
