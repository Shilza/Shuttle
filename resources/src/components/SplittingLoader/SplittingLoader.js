import React from "react";

import styles from './splittingLoader.module.css';
import {Icon} from "antd";

const SplittingLoader = () => (
  <div className={styles.container}>
    <h1>Shuttle</h1>
    <Icon type="loading" className={styles.loader}/>
  </div>
);

export default SplittingLoader;
