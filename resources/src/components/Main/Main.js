import React from "react";

import {isMobile} from "utils/isMobile";
import styles from './main.module.css';

const Main = ({children}) => (
  <main className={styles.container}>
    <div className={isMobile() ? styles.mobileChildren : styles.children}>
      {children}
    </div>
  </main>
);

export default Main;
