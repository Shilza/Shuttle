import styles from '../edit.module.css';
import React from "react";

const MaterialInput = ({defaultValue = '', label}) => (
    <div className={styles.group}>
        <input type="text" required defaultValue={defaultValue}/>
        <span className={styles.highlight}/>
        <span className={styles.bar}/>
        <label>{label}</label>
    </div>
);

export default MaterialInput;