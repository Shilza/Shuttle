import styles from './loader.module.css';
import React from "react";
import {Icon} from "antd";

const Loader = ({center =  false}) => (
    <div className={[styles.loader, center ? styles.center : '' ].join(' ')}>
        <Icon type={'loading'}/>
    </div>
);

export default Loader;
