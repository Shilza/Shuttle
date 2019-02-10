import styles from './materialInput.module.css';
import React from "react";

class MaterialInput extends React.Component {
    render() {
        const {label, onChange, defaultValue} = this.props;

        return (
            <div className={styles.group}>
                <input type="text" required defaultValue={defaultValue} onChange={onChange}/>
                <span className={styles.highlight}/>
                <span className={styles.bar}/>
                <label className={styles.label}>{label}</label>
            </div>
        );
    }
}


export default MaterialInput;