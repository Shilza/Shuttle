import React from "react";
import styles from './listModal.module.css'

const ListModal = ({children}) =>
    <ul className={styles.listModalContainer}>
        {children}
    </ul>;

export default ListModal;