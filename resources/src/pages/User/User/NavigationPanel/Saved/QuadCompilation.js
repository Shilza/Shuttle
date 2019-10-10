import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';

const QuadCompilation = (src, index) => (
  <div className={styles.media} key={index}>
    {
      src.match('.mp4')
        ? <video src={src} preload={"metadata"}/>
        : <img src={src} alt={'Compilation'}/>
    }
  </div>
);

QuadCompilation.propTypes = {
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default QuadCompilation;
