import React from "react";
import styles from './startLoader.module.css';

const StartLoader = () => {
    return (
        <div className={styles.container}>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};

export default StartLoader;