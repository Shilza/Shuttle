import styles from './saved.module.css';
import navigationStyles from '../navigationPanel.module.css';
import React from "react";

const SavedExplainingLabel = () => (
    <div className={navigationStyles.sectionContainer}>
        <div className={navigationStyles.iconContainer}>
            <div className={styles.bookmark}/>
        </div>
        <span className={navigationStyles.sectionLabel}>Save</span>
        <span>
            Save photos and videos you want to watch again. No one gets notified of this, and the saved items are visible only to you.
        </span>
    </div>
);

export default SavedExplainingLabel;