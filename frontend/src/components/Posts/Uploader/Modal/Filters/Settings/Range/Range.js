import React from "react";

import styles from './range.module.css';

const Range = ({...props}) => (
  <input type="range" className={styles.slider} {...props}/>
);

export default Range;
