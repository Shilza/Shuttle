import styles from './loader.module.css';
import React from "react";
import {Icon} from "antd";

const style = {
  color: 'var(--icon)'
};

const Loader = ({center = false, className}) => (
  <div className={[styles.loader, className, center ? styles.center : ''].join(' ')}>
    <Icon type={'loading'} style={style}/>
  </div>
);

export default Loader;
