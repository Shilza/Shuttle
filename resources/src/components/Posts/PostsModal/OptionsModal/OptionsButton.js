import {Icon} from "antd";
import React from "react";
import styles from './optionsModal.module.css';

const OptionsButton = ({open}) => (
    <button className={styles.optionsButton} onClick={open}>
        <Icon type="ellipsis" style={{color: 'rgba(0,0,0,1)'}}/>
    </button>
);

export default OptionsButton;