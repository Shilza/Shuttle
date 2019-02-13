import React from "react";
import styles from './marks.module.css';
import navigationStyles from '../navigationPanel.module.css';

const Marks = () => (
    <div className={navigationStyles.sectionContainer}>
        <div className={navigationStyles.iconContainer}>
            <div className={styles.eye}/>
        </div>
        <span className={navigationStyles.sectionLabel}>Marks</span>
        <span>Here you can see the photos in which you are marked</span>
    </div>
);

export default Marks;