import React from "react";
import {Icon} from "antd";
import styles from './editTitle.module.css';

const EditTitle = ({ submit, onClose }) => (
  <div className={styles.container}>
    <Icon type="left" onClick={onClose}/>
    <span className={styles.title}>Edit profile</span>
    <Icon className={styles.check} type="check" onClick={submit}/>
  </div>
);

export default EditTitle;
