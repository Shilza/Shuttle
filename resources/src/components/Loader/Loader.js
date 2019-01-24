import React from "react";
import styles from './loader.module.css';

const Loader = () => {
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

export default Loader;