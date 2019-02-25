import styles from '../../User/NavigationPanel/Saved/saved.module.css';
import React from "react";
import ExplainingLabel from "../ExplainingLabel";

const SavedExplainingLabel = () =>
    <ExplainingLabel icon={<div className={styles.bookmark}/>} text='Save'>
          <span>
            Save photos and videos you want to watch again. No one gets notified of this, and the saved items are visible only to you.
        </span>
    </ExplainingLabel>;

export default SavedExplainingLabel;