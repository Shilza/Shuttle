import React from "react";
import {Icon} from "antd";

import styles from './splittingLoader.module.css';

const SplittingLoader = () => (
  <div className={styles.container}>
    <h1 className={styles.header}>Shuttle</h1>
    <Icon type="loading" className={styles.loader}/>
  </div>
);

export default SplittingLoader;
