import styles  from './explainingLabels.module.css';
import React from "react";

const ExplainingLabel = ({children, icon, text}) => (
    <div className={styles.sectionContainer}>
        <div className={styles.iconContainer}>
            {icon}
        </div>
        <span className={styles.sectionLabel}>{text}</span>
        {children}
    </div>
);

export default ExplainingLabel;