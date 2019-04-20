import React from "react";
import PropTypes from 'prop-types';
import styles from './materialInput.module.css';

const MaterialInput = ({label, onChange, defaultValue}) => (
    <div className={styles.group}>
        <input type="text" required defaultValue={defaultValue} onChange={onChange}/>
        <span className={styles.highlight}/>
        <span className={styles.bar}/>
        <label className={styles.label}>{label}</label>
    </div>
);

MaterialInput.propTypes = {
    label: PropTypes.node,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

export default MaterialInput;