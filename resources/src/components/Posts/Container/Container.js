import React from "react";

import styles from './container.module.css'

const Container = ({children, ...props}) => (
  <div onSubmit={console.log} className={styles.container} {...props}>
    {children}
  </div>
);

export default Container;
