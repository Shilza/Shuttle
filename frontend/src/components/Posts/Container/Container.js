import React from "react";

import styles from './container.module.css'

const Container = ({children, className, ...props}) => (
  <div className={`${styles.container} ${className}`} {...props}>
    {children}
  </div>
);

export default Container;
