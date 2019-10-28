import React from "react";

import styles from './tag.module.css';

const Tag = ({children, className, ...props}) => (
  <span className={`${styles.container} ${className}`} {...props}>
    {children}
  </span>
);

export default Tag;
