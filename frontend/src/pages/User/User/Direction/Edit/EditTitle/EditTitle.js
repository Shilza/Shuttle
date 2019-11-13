import React from "react";
import {Icon} from "antd";
import styles from './editTitle.module.css';
import Loader from "components/Paginator/Loader/Loader";

const EditTitle = ({ submit, isLoading, onClose }) => (
  <div className={styles.container}>
    <Icon type="left" onClick={onClose}/>
    <span className={styles.title}>Edit profile</span>
    {
      isLoading
        ?  <Loader/>
        : <Icon className={styles.check} type="check" onClick={submit}/>
    }
  </div>
);

export default EditTitle;
