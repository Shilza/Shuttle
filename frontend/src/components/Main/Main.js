import React from "react";

import {isMobile} from "utils";
import styles from './main.module.css';

const Main = ({children, isPrivate = false}) => (
  <main className={styles.container}>
    <div className={(isMobile() && isPrivate) ? styles.mobileChildren : styles.children}>
      {children}
    </div>
  </main>
);

export default Main;
