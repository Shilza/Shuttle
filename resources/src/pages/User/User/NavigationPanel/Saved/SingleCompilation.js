import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';

const SingleCompilation = ({src}) => (
  <div className={styles.singlePic}>
    {
      src.match('.mp4')
      ? <video src={src} preload={"metadata"}/>
      : <img src={src} alt={'Compilation'}/>
    }
  </div>
);

SingleCompilation.propTypes = {
  src: PropTypes.string.isRequired
};

export default SingleCompilation;
