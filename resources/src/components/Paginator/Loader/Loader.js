import styles from './loader.module.css';
import React from "react";
import {Icon} from "antd";

const Loader = () => (
    <div className={styles.loader}>
        <Icon type={'loading'}/>
    </div>
);

export default Loader;