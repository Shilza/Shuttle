import styles from '../edit.module.css';
import React from "react";

const MaterialInput = ({defaultValue = '', error, label, onChange}) => (
    <div className={styles.group}>
        <input type="text" required defaultValue={defaultValue} onChange={onChange}/>
        <span className={styles.highlight}/>
        <span className={styles.bar}/>
        <label className={styles.label}>{label}</label>
        {
            error && <label className={styles.errorLabel}>{error}</label>
        }
    </div>
);

export default MaterialInput;