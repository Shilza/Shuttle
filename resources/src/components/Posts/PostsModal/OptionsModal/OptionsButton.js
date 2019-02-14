import {Icon} from "antd";
import React from "react";
import styles from './optionsModal.module.css';

const OptionsButton = ({open}) => (
    <button className={styles.optionsButton} onClick={open}>
        <Icon type="ellipsis"/>
    </button>
);

export default OptionsButton;