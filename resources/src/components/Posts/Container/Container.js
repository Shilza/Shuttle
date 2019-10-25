import React from "react";

import styles from './container.module.css'

const Container = ({children, ...props}) => (
  <div className={styles.container} {...props}>
    {children}
  </div>
);

export default Container;
